import { useProfile } from "../context/ProfileContext";
import { useLinks } from "../context/LinkContext";
import { useShop } from "../context/ShopContext";
import LinkTreePreview from "../components/Shared/LinkTreePreview";

export default function PublicProfile() {
  const { profile, loading } = useProfile();
  const { links, loadingLinks } = useLinks();
  const { products, loadingProducts } = useShop();

  return (
    <div className="w-full flex justify-center items-center bg-[#A6A8AA] md:py-10">
      <LinkTreePreview
        profile={profile}
        links={links}
        loading={loading}
        loadingLinks={loadingLinks}
        products={products}
        loadingProducts={loadingProducts}
      />
    </div>
  );
}
