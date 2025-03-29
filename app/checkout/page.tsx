"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from "@/store/cart-store"
import { checkoutAction } from "./checkout-action"

export default function checkoutPage(){
    const {items,addItem,removeItem} = useCartStore()
    const total = items.reduce((acc,item) => acc + (item.price * item.quantity),0)

    if (total === 0 || items.length === 0 ){
        return (
            <div className="">
                <h1>Your cart is empty.</h1>
            </div>
        )

    }
    return (
        <div className="container mx-auto px-4 py-8 rext-center">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <Card className="max-w-md mx-auto mb-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold ">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {items.map((item,key) => (
                            <li key={key} className="flex flex-col gap-2 border-b pb-12">
                                <div className="flex justify-between">
                                <span className="font-medium">{item.name}</span>
                                <span className="font-semibold">${((item.price *item.quantity)/100).toFixed(2)}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button  variant="outline" onClick={() => removeItem(item.id)}>-</Button>
                                    <span className="text-lg font-semibold ">{item.quantity}</span>
                                    <Button variant="outline" onClick={() => addItem({...item,quantity :1})}>+</Button>
                                </div>
                            </li>

                        ))}
                    </ul>

                    <div className="mt-4 border-t text-lg font-semibold">
                        Total: $({total/100}).toFixed(2)
                    </div>
                </CardContent>
            </Card>
            <form action={checkoutAction} className="max-w-md mx-auto">
                <input type="hidden" name="items" value={JSON.stringify(items)}/>
                <Button variant={"default"} className="w-full">Proceed to payment...</Button>
            </form>
        </div>
    )
}