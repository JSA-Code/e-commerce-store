import { getProductData } from '@/utils/product-data';
import { getUrlNames, getTitleNames } from '@/utils/product-names';
import Checkout from '../CheckoutButton';
import Image from 'next/image';
// import { format } from 'sharp';
// const reviews = { href: '#', average: 5, totalCount: 1 };

export const dynamicParams = false;

export function generateMetadata({ params: { slug } }) {
  const titleNames = getTitleNames([slug]).toString();
  // console.log('TITLE NAMES', titleNames);
  return {
    title: `${titleNames} - CuteAsset`,
    description: 'CuteAsset is a marketplace for digital assets.',
  };
}

export async function generateStaticParams() {
  const productData = await getProductData();
  const formatNames = getUrlNames(productData);
  return formatNames.map((slug) => ({ slug }));
}

export default async function ProductPage({ params: { slug } }) {
  const productData = await getProductData();
  const mainProduct = productData.find((p) => {
    const formattedName = p.product.name.toLowerCase().split(' ').join('-');
    return formattedName === slug;
  });
  const titleNames = getTitleNames([mainProduct]);

  // console.log('MAIN PRODUCT', mainProduct);
  // console.log('PARAMS', params);
  // console.log('PARAMS SLUG', params.slug);

  if (!mainProduct) {
    return { notFound: true };
  }

  return (
    <div className="pt-24 pb-48 bg-gray-50 dark:bg-gray-50">
      {/* Info Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 xl:gap-x-10 py-10 px-0 xl:px-20">
        {/* Image gallery */}
        <div className="max-w-xs md:max-w-md mx-auto">
          <Image
            src={mainProduct.product.images[0]}
            alt="product image"
            width={500}
            height={500}
            className="w-full h-full object-cover object-center shadow-xl aspect-[6/4]"
          />
        </div>
        {/* Product info */}
        <div className="max-w-md mt-10 md:mt-0 text-center md:text-left mx-auto">
          {/* Product name */}
          <h1 className="text-md font-semibold tracking-tight text-gray-800">
            Overlays
          </h1>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {titleNames}
          </h1>

          {/* Options */}
          <div>
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 mt-3 font-bold">
              {(mainProduct.unit_amount / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>

            {/* Reviews */}
            {/* <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div> */}

            {/* Checkout Page */}
            <div className="mt-10">
              {/* <Checkout priceId={mainProduct.id} /> */}
              <Checkout priceId={mainProduct.id} />
            </div>
          </div>

          {/* Description */}
          <div className="mt-10">
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6">
              <p className="text-base text-gray-900">
                {mainProduct.product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
