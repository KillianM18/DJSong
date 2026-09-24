import SubscriptionPlans from "../../components/SubscriptionPlan/SubscriptionPlan";
import CurrentSubscription from "../../components/CurrentSubcription/CurrentSubscription";
import "./Subscription.scss";


const currentSubscription = {
  name: "or",
  price: "9,99€/mois",
  feature1: "Accès illimité à toutes les fonctionnalités",
  feature2: "Support prioritaire",
  feature3: "Contenu exclusif",
};

const availablePlans = [
  {
    id: 1,
    title: "argent",
    price: "gratuit",
    isFree: true,
    feature1: "Accès limité aux fonctionnalités",
    feature2: "Support basique",
    feature3: "Contenu standard",
  },
  {
    id: 2,
    title: "or",
    price: "9,99€/mois",
    feature1: "Accès illimité à toutes les fonctionnalités",
    feature2: "Support prioritaire",
    feature3: "Contenu exclusif",
  },
  {
    id: 3,
    title: "platine",
    price: "19,99€/mois",
    feature1: "Accès illimité à toutes les fonctionnalités",
    feature2: "Support prioritaire",
    feature3: "Contenu exclusif et bonus",
  },
  {
    id: 4,
    title: "diamant",
    price: "29,99€/mois",
    feature1: "Accès illimité à toutes les fonctionnalités",
    feature2: "Support prioritaire et dédié",
    feature3: "Contenu exclusif, bonus et événements spéciaux",
  }
];

function Subscription() {
    const handleSelectPlan = (plan) => {
    console.log("Plan sélectionné :", plan);

  };
 
  return (
    <div className="Abonnement">
      <CurrentSubscription subscription={currentSubscription} />
 
      {/* isGuest est pour l'instant forcé à true dans SubscriptionPlan.jsx
          (pas encore branché sur un vrai système d'auth). */}
      <SubscriptionPlans plans={availablePlans} onSelectPlan={handleSelectPlan} />
    </div>
  );
};

export default Subscription;