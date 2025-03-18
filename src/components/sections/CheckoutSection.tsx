import React from 'react';

interface CheckoutSectionProps {
  productName: string;
  originalPrice?: number;
  price: number;
  buttonText: string;
  buttonLink: string;
  paymentMethods?: string[];
  installments?: string;
  securityBadgeUrl?: string;
}

export const CheckoutSection: React.FC<CheckoutSectionProps> = ({
  productName,
  originalPrice,
  price,
  buttonText,
  buttonLink,
  paymentMethods = ["Cartão de crédito", "Boleto", "Pix"],
  installments,
  securityBadgeUrl = "https://digitalmarketplaceworld.shop/wp-content/uploads/2023/12/Checkout-Seguro-1.png"
}) => {
  return (
    <section className="py-16 bg-black" id="compra">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-b from-primary/30 to-black rounded-3xl p-8 max-w-3xl mx-auto border-2 border-primary shadow-xl shadow-primary/30">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{productName}</h2>
          
          {originalPrice && (
            <p className="text-xl text-red-500 line-through text-center font-bold">
              De R${originalPrice.toFixed(2)}
            </p>
          )}
          
          <p className="text-5xl font-bold text-primary text-center mb-6 drop-shadow-lg">
            Por apenas R${price.toFixed(2)}
          </p>
          
          {installments && (
            <p className="text-white text-center mb-8 text-xl">{installments}</p>
          )}
          
          <a 
            href={buttonLink}
            className="block w-full max-w-md mx-auto bg-primary hover:bg-primary/80 text-black font-bold py-5 px-8 rounded-full text-center text-2xl transform transition-all hover:scale-105 mb-8 animate-pulse shadow-lg shadow-primary/30"
          >
            {buttonText}
          </a>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {paymentMethods.map((method, index) => (
              <span key={index} className="bg-gray-800 text-white px-5 py-2 rounded-full text-sm border border-primary/30">
                {method}
              </span>
            ))}
          </div>
          
          {securityBadgeUrl && (
            <div className="flex justify-center">
              <img 
                src={securityBadgeUrl} 
                alt="Pagamento Seguro"
                className="h-auto max-h-20"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
