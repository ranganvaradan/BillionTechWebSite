import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { PlatformPage } from '@/pages/PlatformPage';
import { ProductPage } from '@/pages/ProductPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { ProofPage } from '@/pages/ProofPage';
import { WhoWeServePage } from '@/pages/WhoWeServePage';
import { WhyBillionTechPage } from '@/pages/WhyBillionTechPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="platform/:platformId" element={<PlatformPage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="why-billiontech" element={<WhyBillionTechPage />} />
          <Route path="who-we-serve" element={<WhoWeServePage />} />
          <Route path="proof" element={<ProofPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
