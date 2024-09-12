export default async function Page () {
    console.log('Loading');
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/api/products");
        const jsonRes = await res.json();
        const products = jsonRes.products;

        // console.log(products);

        return products;
    }

    const products = await fetchProducts();

    console.log(products);

    return (
        <div>
            <h1>This products are mine</h1>
            {products.map((product: any) => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    )
}