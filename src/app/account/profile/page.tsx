"use client";

import { useState } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";
import { useAuthMeasurements, useAuthUser } from "@/hooks/use-auth";
import { validatePassword } from "@/lib/auth-validation";
import { AuthAlert } from "@/components/auth/AuthAlert";

export default function ProfilePage() {
  const user = useAuthUser();
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const changePassword = useAuthStore((s) => s.changePassword);
  const updateMeasurements = useAuthStore((s) => s.updateMeasurements);
  const measurements = useAuthMeasurements();
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [saved, setSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const [meas, setMeas] = useState(measurements);
  const [measSaved, setMeasSaved] = useState(false);

  const handleProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ firstName, lastName, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const err = validatePassword(newPw);
    if (err) {
      setPwMsg(err);
      return;
    }
    const ok = changePassword(currentPw, newPw);
    if (ok) {
      setPwMsg("Password updated successfully.");
      setCurrentPw("");
      setNewPw("");
    } else {
      setPwMsg("Could not update password.");
    }
  };

  const handleMeas = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements(meas);
    setMeasSaved(true);
    setTimeout(() => setMeasSaved(false), 3000);
  };

  return (
    <AccountShell
      title="Profile"
      subtitle="Manage your personal details and preferences."
      skeletonVariant="form"
    >
      <AuthAlert error={error} />

      <form onSubmit={handleProfile} className="space-y-4 rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
        <h2 className="font-display text-xl text-charcoal">Personal Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-2" />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
        </div>
        <p className="text-sm text-taupe">{user?.email}</p>
        <Button type="submit" variant="default" size="sm">
          {saved ? "Saved" : "Save Profile"}
        </Button>
      </form>

      <form onSubmit={handlePassword} className="mt-8 space-y-4 rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow">
        <h2 className="font-display text-xl text-charcoal">Change Password</h2>
        <PasswordField id="current" label="Current Password" value={currentPw} onChange={setCurrentPw} />
        <PasswordField id="new" label="New Password" value={newPw} onChange={setNewPw} />
        {pwMsg && <p className="text-xs text-bronze">{pwMsg}</p>}
        <Button type="submit" variant="outline" size="sm">
          Update Password
        </Button>
      </form>

      <form
        id="measurements"
        onSubmit={handleMeas}
        className="mt-8 space-y-4 rounded-sm border border-taupe/15 bg-warmwhite p-6 product-card-shadow"
      >
        <h2 className="font-display text-xl text-charcoal">Saved Measurements</h2>
        <p className="text-sm text-charcoalsoft">
          Store your fit preferences for faster bespoke consultations.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(["chest", "waist", "shoulder", "sleeve"] as const).map((key) => (
            <div key={key}>
              <Label htmlFor={key} className="capitalize">
                {key}
              </Label>
              <Input
                id={key}
                value={meas[key] ?? ""}
                onChange={(e) => setMeas({ ...meas, [key]: e.target.value })}
                className="mt-2"
                placeholder="inches"
              />
            </div>
          ))}
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            value={meas.notes ?? ""}
            onChange={(e) => setMeas({ ...meas, notes: e.target.value })}
            className="mt-2"
          />
        </div>
        <Button type="submit" variant="outline" size="sm">
          {measSaved ? "Saved" : "Save Measurements"}
        </Button>
      </form>
    </AccountShell>
  );
}
