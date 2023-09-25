import { getProductData } from '@/utils/product-data';
import { getUrlNames, getTitleNames } from '@/utils/product-names';
import { secondary } from '@/utils/fonts';
import Link from 'next/link';
import Image from 'next/image';

export async function getData() {
  const productData = await getProductData();
  const urlNames = getUrlNames(productData);
  const titleNames = getTitleNames(productData);
  // console.log(productData);

  if (!productData) {
    return { notFound: true };
  }
  return [productData, urlNames, titleNames];
}

export default async function OverlayShowcase() {
  const [productData, urlNames, titleNames] = await getData();
  return (
    <div
      id="overlay-showcase"
      className="bg-inherit dark:bg-inherit px-4 sm:px-6 lg:px-8"
    >
      <h2 className="sr-only">Products</h2>

      <div
        className={`${secondary.variable} font-secondary text-lg font-normal grid grid-cols-1 gap-y-10 justify-items-center text-gray-800 dark:text-gray-900 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {productData.map((item, index) => (
          <Link
            key={item.id}
            href={`/overlays/${urlNames[index]}`}
            className="group hover:scale-110 transition duration-75 ease-out"
          >
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg shadow-xl sm:w-full">
              <span className="text-lg">
                {(item.unit_amount / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
              <Image
                src={item.product.images[0]}
                alt="product image"
                width={1140}
                height={912}
                className="h-full w-full object-fill"
              />
            </div>
            {/* PRORDUCT NAME GOES HERE */}
            <h3 className="mt-4">{`${titleNames[index]}`}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
