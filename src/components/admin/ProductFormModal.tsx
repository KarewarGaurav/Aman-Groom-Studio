"use client";



import { useEffect, useRef, useState } from "react";

import {

  Dialog,

  DialogContent,

  DialogHeader,

  DialogTitle,

} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {

  CATEGORY_DEFAULT_IMAGE,

  ProductImageField,

} from "@/components/admin/ProductImageField";

import { distributeStockAcrossSizes } from "@/lib/admin-inventory-utils";
import { slugify } from "@/lib/utils";

import type { AdminProduct } from "@/types/admin";



interface ProductFormModalProps {

  open: boolean;

  onClose: () => void;

  product?: AdminProduct | null;

  onSave: (product: AdminProduct) => void;

}



export function ProductFormModal({

  open,

  onClose,

  product,

  onSave,

}: ProductFormModalProps) {

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("sherwanis");

  const [stock, setStock] = useState("5");

  const [description, setDescription] = useState("");

  const [featured, setFeatured] = useState(false);

  const [image, setImage] = useState(CATEGORY_DEFAULT_IMAGE.sherwanis);

  const [imageError, setImageError] = useState<string | null>(null);

  const imageCustomized = useRef(false);



  useEffect(() => {

    if (product) {

      setName(product.name);

      setPrice(String(product.price));

      setCategory(product.category);

      setStock(String(product.stockCount));

      setDescription(product.description);

      setFeatured(product.featured);

      setImage(product.image);

      imageCustomized.current = true;

    } else {

      setName("");

      setPrice("");

      setCategory("sherwanis");

      setStock("5");

      setDescription("");

      setFeatured(false);

      setImage(CATEGORY_DEFAULT_IMAGE.sherwanis);

      imageCustomized.current = false;

    }

    setImageError(null);

  }, [product, open]);



  const handleCategoryChange = (next: string) => {

    setCategory(next);

    if (!imageCustomized.current && !product) {

      setImage(CATEGORY_DEFAULT_IMAGE[next] ?? CATEGORY_DEFAULT_IMAGE.sherwanis);

    }

  };



  const handleImageChange = (url: string) => {

    imageCustomized.current = true;

    setImage(url);

    setImageError(null);

  };



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!image.trim()) {

      setImageError("Add a product image before saving.");

      return;

    }

    const slug = slugify(name);

    const stockNum = Number(stock);

    const variants = product?.variants.length

      ? distributeStockAcrossSizes(product.variants, stockNum)

      : [{ size: "40", stock: stockNum }];

    const payload: AdminProduct = product

      ? {

          ...product,

          name,

          slug,

          price: Number(price),

          category,

          image: image.trim(),

          stockCount: stockNum,

          variants,

          description,

          featured,

          inStock: stockNum > 0,

        }

      : {

          id: `p_${Date.now()}`,

          slug,

          name,

          price: Number(price),

          category,

          image: image.trim(),

          tags: ["new"],

          featured,

          inStock: stockNum > 0,

          stockCount: stockNum,

          variants,

          description,

        };

    onSave(payload);

    onClose();

  };



  return (

    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>

      <DialogContent className="max-h-[min(92dvh,100%)] max-w-lg overflow-y-auto border-champagne/50 bg-warmwhite sm:max-w-xl">

        <DialogHeader>

          <DialogTitle className="font-display text-xl font-light sm:text-2xl">

            {product ? "Edit product" : "Add product"}

          </DialogTitle>

        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">

          <ProductImageField

            image={image}

            onImageChange={handleImageChange}

            error={imageError ?? undefined}

          />



          <div>

            <Label>Name</Label>

            <Input

              value={name}

              onChange={(e) => setName(e.target.value)}

              required

              className="mt-1"

            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <Label>Price (INR)</Label>

              <Input

                type="number"

                value={price}

                onChange={(e) => setPrice(e.target.value)}

                required

                className="mt-1"

              />

            </div>

            <div>

              <Label>Stock</Label>

              <Input

                type="number"

                value={stock}

                onChange={(e) => setStock(e.target.value)}

                className="mt-1"

              />

            </div>

          </div>

          <div>

            <Label>Category</Label>

            <select

              value={category}

              onChange={(e) => handleCategoryChange(e.target.value)}

              className="mt-1 w-full rounded-md border border-champagne/50 bg-ivory px-3 py-2 font-body text-sm"

            >

              <option value="sherwanis">Sherwanis</option>

              <option value="tuxedos">Tuxedos</option>

              <option value="indo-western">Indo-Western</option>

              <option value="kurta-sets">Kurta Sets</option>

              <option value="reception">Reception</option>

              <option value="accessories">Accessories</option>

            </select>

          </div>

          <div>

            <Label>Description</Label>

            <textarea

              value={description}

              onChange={(e) => setDescription(e.target.value)}

              rows={3}

              className="mt-1 w-full rounded-md border border-champagne/50 bg-ivory px-3 py-2 font-body text-sm"

            />

          </div>

          <label className="flex items-center gap-2 font-body text-sm">

            <input

              type="checkbox"

              checked={featured}

              onChange={(e) => setFeatured(e.target.checked)}

            />

            Feature on homepage

          </label>

          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">

            <Button type="button" variant="outline" onClick={onClose}>

              Cancel

            </Button>

            <Button type="submit" className="bg-charcoal hover:bg-burgundy">

              Save product

            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>

  );

}

