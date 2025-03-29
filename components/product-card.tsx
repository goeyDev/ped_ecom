import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={`/products/${product.id}`}>
      <Card>
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
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">{product.name}</CardTitle>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}

            {price && price.unit_amount && (
              <p className="text-xl">${(price.unit_amount / 100).toFixed(2)}</p>
            )}
            <Button>View Details</Button>
          </CardContent>
        </CardHeader>
      </Card>
    </Link>
  );
};
