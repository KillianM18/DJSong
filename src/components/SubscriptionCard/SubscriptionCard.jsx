import "./SubscriptionCard.scss";

function SubscriptionCard({plan,variant,isGuest = false,onSelect, onRequireLogin}) {
    //Card component for subscription plans

    const { title, price, feature1, feature2, feature3, isFree = false } = plan;
    const mustLoginFirst = isGuest && isFree;
 
    const handleClick = () => {
        if (mustLoginFirst) {
        onRequireLogin?.(plan);
        } else {
        onSelect?.(plan);
        }
    };

    return (
        <div className={`subscription-card subscription-card--${variant}`}>

            <h3 className="subscription-card__title"><img src={`src/assets/images/logo_${title}.webp`} alt="logo abo" />
{title}</h3>
            
            <ul className="subscription-card__features">
                <li>{feature1}</li>
                <li>{feature2}</li>
                <li>{feature3}</li>
            </ul>
            <div className="subscription-card__footer">
                <p className="subscription-card__price">{price}</p>
        
                {mustLoginFirst && (
                <p className="subscription-card__hint">Connectez-vous pour en profiter</p>
                )}

            </div>
        </div>
    );
}

export default SubscriptionCard;