import About from "../mainPages/about";
import Home from "../mainPages/home";

const pages = {
  about: About,
  home: Home,
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;  // <-- necesario

    const PageComponent = pages[slug];

    if (!PageComponent) return <h1>404 - Página no encontrada</h1>;

    return <PageComponent />;
}
