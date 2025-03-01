import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  quote: string;
  rating: number;
  improvement: string;
  language: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialSection = ({
  testimonials = defaultTestimonials,
}: TestimonialSectionProps) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our AI conversation practice has helped language learners
            achieve their goals
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static mx-2 translate-y-0" />
              <CarouselNext className="static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Join thousands of satisfied learners who have improved their
            language skills
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Avatar className="h-12 w-12 mr-4 border-2 border-blue-100">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>

      <blockquote className="text-gray-700 italic mb-4 flex-grow">
        "{testimonial.quote}"
      </blockquote>

      <div className="mt-auto">
        <div className="text-sm font-medium text-blue-600 mb-1">
          Language: {testimonial.language}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Improvement:</span>{" "}
          {testimonial.improvement}
        </div>
      </div>
    </div>
  );
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    role: "Marketing Professional",
    quote:
      "The AI conversation practice made a huge difference in my Spanish fluency. I can now confidently lead meetings with our international team.",
    rating: 5,
    improvement: "Business vocabulary and fluency",
    language: "Spanish",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    role: "Graduate Student",
    quote:
      "I needed to improve my English for academic purposes. The AI tutors helped me practice complex discussions that prepared me for my university seminars.",
    rating: 5,
    improvement: "Academic speaking and confidence",
    language: "English",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    role: "Software Engineer",
    quote:
      "Being able to practice technical conversations in English at any time of day was invaluable. My communication with international clients improved dramatically.",
    rating: 4,
    improvement: "Technical vocabulary and pronunciation",
    language: "English",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    role: "Travel Blogger",
    quote:
      "I learned Spanish for my South America trip. The AI conversation practice made me comfortable with everyday phrases and local expressions.",
    rating: 5,
    improvement: "Travel vocabulary and local expressions",
    language: "Spanish",
  },
  {
    id: "5",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    role: "Medical Resident",
    quote:
      "The platform helped me master medical terminology in Spanish. I can now better communicate with Spanish-speaking patients.",
    rating: 5,
    improvement: "Medical vocabulary and patient communication",
    language: "Spanish",
  },
  {
    id: "6",
    name: "Thomas Weber",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    role: "Business Consultant",
    quote:
      "I needed to improve my English quickly for an international project. The AI tutors were available whenever I needed practice.",
    rating: 4,
    improvement: "Business negotiation skills",
    language: "English",
  },
];

export default TestimonialSection;
