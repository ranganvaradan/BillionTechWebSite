import { Navigate, useParams } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { ProductPageTemplate } from '@/components/product/ProductPageTemplate';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return <ProductPageTemplate product={product} />;
}
