import "./CurrentSubscription.scss";


function CurrentSubscription({ subscription }) {
  if (!subscription) return null;

  const { name, price, feature1, feature2, feature3 } = subscription;

  return (
    <div className="current-subscription">
      <div className="current-subscription__header">
        <img src={`src/assets/images/logo_${name}.webp`} alt="logo abo" />
        <span className="current-subscription__label">Mon abonnement : </span>
        <span className="current-subscription__name">{name}</span>
        <span className="current-subscription__price"> {price}</span>
      </div>

      <p className="current-subscription__features-title">Avantage</p>
      <ul className="current-subscription__features">
        <li>{feature1}</li>
        <li>{feature2}</li>
        <li>{feature3}</li>
      </ul>
    </div>
  );
}

export default CurrentSubscription;