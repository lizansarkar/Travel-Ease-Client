import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
          About <span className="text-blue-600">TravelEase</span>
        </h2>

        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Your trusted platform for seamless and reliable vehicle rentals.
        </p>

        <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Redefining the Way You Travel
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                TravelEase is built on the vision of providing an **easy,
                transparent, and hassle-free** vehicle rental experience. We
                connect vehicle owners who want to earn extra income with
                travelers and locals looking for the perfect ride.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you need a luxury SUV for a weekend getaway or a compact
                car for city travel, our diverse fleet has you covered. We
                prioritize **safety, affordability, and convenience** in every
                booking.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span className="text-2xl text-blue-600">🚗</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Vast Selection
                  </h4>
                  <p className="text-sm text-gray-500">
                    Choose from hundreds of verified vehicles, from economy cars
                    to premium models.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-2xl text-blue-600">🔒</span>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Secure & Verified
                  </h4>
                  <p className="text-sm text-gray-500">
                    Every owner and vehicle on our platform is thoroughly vetted
                    for your safety.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-2xl text-blue-600">📱</span>
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Support</h4>
                  <p className="text-sm text-gray-500">
                    Our dedicated team is always available to assist with your
                    bookings and queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
