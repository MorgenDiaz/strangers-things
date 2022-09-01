export const Post = ({ title, seller, description, location, price }) => {
  return (
    <div className="bg-overlay p-2 m-4">
      <h3>{title}</h3>
      <h4>Seller: {seller}</h4>
      <article>{description}</article>
      <h4>{location}</h4>
      <h3>{price}</h3>
    </div>
  );
};
