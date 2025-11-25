import { useProfile } from "../context/ProfileContext";
import { useLinks } from "../context/LinkContext";
import { useShop } from "../context/ShopContext"; // SHOP FEATURE - Import Shop Context
import LinkTreePreview from "../components/Shared/LinkTreePreview";

export default function PublicProfile() {
  const { profile, loading } = useProfile();
  const { links, loadingLinks } = useLinks();
  const { products, loadingProducts } = useShop(); // SHOP FEATURE - Get products from Shop Context

  return (
    <div className="w-full flex justify-center items-center bg-[#A6A8AA] md:py-10">
      <LinkTreePreview
        profile={profile}
        links={links}
        loading={loading}
        loadingLinks={loadingLinks}
        products={products} // SHOP FEATURE - Pass products to preview
        loadingProducts={loadingProducts} // SHOP FEATURE - Pass loading state
      />
    </div>
  );
}
