import { Card, CardContent } from "../shared/ui/card";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO at StartupCo",
      content:
        "Working with this team has been transformational for our business. They delivered exactly what they promised and exceeded our expectations at every turn.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Director of Marketing",
      content:
        "The level of professionalism and expertise demonstrated throughout our project was outstanding. I would recommend them to any business looking for real results.",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Founder at TechStart",
      content:
        "From start to finish, the communication was transparent and the delivery was flawless. They truly understand what it takes to build a successful solution.",
      rating: 5,
      avatar: "👩‍🚀",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Testimonial Section
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let your happy clients speak for you.
            <span className="block mt-2">
              Real experiences from real customers who have transformed their
              business with our solutions.
            </span>
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-8">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Join hundreds of satisfied customers who trust us with their
            business growth.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <span>⭐ 4.9/5 rating</span>
            <span>•</span>
            <span>500+ reviews</span>
            <span>•</span>
            <span>100% satisfaction guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
