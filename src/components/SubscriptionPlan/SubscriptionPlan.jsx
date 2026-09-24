import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../SubscriptionCard/SubscriptionCard";
import "./SubscriptionPlan.scss";

// Couleurs appliquées dans l'ordre aux colonnes, comme sur la maquette.
const VARIANTS = ["argent", "gold", "platine", "diamant"];

function SubscriptionPlans({ plans = [], onSelectPlan }) {
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    onSelectPlan?.(plan);
  };

  const handleRequireLogin = () => {
    navigate("/connexion");
  };

  if (!plans.length) return <p className="subscription-plans__state">Aucune offre disponible.</p>;

  return (
    <div className="subscription-plans">
      {plans.map((plan, index) => (
        <SubscriptionCard
          key={plan.id}
          plan={plan}
          variant={VARIANTS[index % VARIANTS.length]}
          isGuest={true}
          onSelect={handleSelect}
          onRequireLogin={handleRequireLogin}
        />
      ))}
    </div>
  );
}

export default SubscriptionPlans;