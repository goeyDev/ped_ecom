"use client"
import Image from "next/image"
import Stripe from "stripe"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"

interface Props{
    product:Stripe.Product
}
export const ProductDetail = ({product}:Props) =>{
    const {items,addItem,removeItem} = useCartStore()
    const cartItem = items.find((item) =>item.id === product.id )
    const quantity = cartItem ? cartItem.quantity:0
    const price=product.default_price as Stripe.Price

    const onAddItem =() => {
        addItem({
            id:product.id,
            name:product.name,
            price:price.unit_amount as number,
            imageUrl:product.images ? product.images[0] : null,
            quantity:1,
        })
    }

    return (
    <div>
        {product.images && product.images[0] && (
            <div className="relative h-60 w-full">
                <Image
                src={product.images[0]}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
                />
            </div>
        )}
        <div>
            <h1>{product.name}</h1>
            {product.description && <p>product.description </p>}
            {price && price.unit_amount && (
                <p className="text-lg font-semibold text-gray-900">${(price.unit_amount /100).toFixed(2)}</p>
            )}
            <div className="space-x-2">
                <Button onClick={() => removeItem(product.id)}variant="outline" className="border-2 border-black hover:bg-black hover:text-white" >-</Button>
                <span className="font-bold">{quantity}</span>
                <Button onClick={onAddItem} variant="outline" className="border-2 border-black">+</Button>
            </div>
        </div>
    </div>)
}