import {
  Users,
  MapPin,
  Calendar,
  Heart,
  Target,
  Shield,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-emerald-800 text-white px-6 py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold">Neighbour Net</div>
          <div className="flex gap-6 items-center">
            <a href="#how" className="hover:text-emerald-200 transition">
              How it Works
            </a>
            <a href="#why" className="hover:text-emerald-200 transition">
              Why Join
            </a>
            <a href="#map" className="hover:text-emerald-200 transition">
              Explore
            </a>
            <button className="bg-white text-emerald-800 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-emerald-50 to-stone-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 mb-6">
              Community first.
            </h1>
            <p className="text-xl text-stone-700 max-w-2xl mx-auto">
              Connect with neighbors in three steps. Just look help, and build
              community—
              <br />
              all within walking distance.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-emerald-100">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop"
                alt="Community members collaborating"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="absolute -left-8 top-1/2 w-32 h-32 bg-emerald-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -right-8 bottom-0 w-40 h-40 bg-emerald-400 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full text-2xl font-bold mb-6">
                01
              </div>
              <h3 className="text-2xl font-semibold text-emerald-900 mb-4">
                Join
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Create your profile and connect with your local community. It
                takes less than 2 minutes to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full text-2xl font-bold mb-6">
                02
              </div>
              <h3 className="text-2xl font-semibold text-emerald-900 mb-4">
                Post a Task
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Share what you need help with or offer your skills to neighbors
                who need assistance.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full text-2xl font-bold mb-6">
                03
              </div>
              <h3 className="text-2xl font-semibold text-emerald-900 mb-4">
                Connect
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Meet up with neighbors, complete tasks, and build lasting
                relationships in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-96 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"
          alt="People working together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900 opacity-30"></div>
      </section>

      <section id="why" className="py-20 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-emerald-900 mb-4">
            Why Join?
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Heart className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                Build Community
              </h3>
              <p className="text-stone-600">
                Foster meaningful connections with people in your neighborhood.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Target className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                Get Things Done
              </h3>
              <p className="text-stone-600">
                Find help for tasks big and small, from moving furniture to pet
                sitting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <Shield className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                Stay Safe
              </h3>
              <p className="text-stone-600">
                Verified profiles and community ratings ensure trustworthy
                interactions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <TrendingUp className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                Earn & Share Skills
              </h3>
              <p className="text-stone-600">
                Offer your expertise, learn new things, and strengthen your
                local economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-96 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=400&fit=crop"
          alt="Community gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent"></div>
      </section>

      <section id="map" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-emerald-900 mb-6">
                See the Big Picture
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">
                      Local First
                    </h3>
                    <p className="text-stone-600">
                      Discover what is happening in your neighborhood with our
                      interactive map.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">
                      Real-time Activity
                    </h3>
                    <p className="text-stone-600">
                      See active tasks, events, and community members near you
                      in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-emerald-900 mb-2">
                      Stay Updated
                    </h3>
                    <p className="text-stone-600">
                      Never miss local events, meetups, or opportunities to help
                      your neighbors.
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-8 bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-lg">
                Explore Map
              </button>
            </div>

            <div className="relative">
              <div className="bg-emerald-100 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&h=500&fit=crop"
                  alt="Map view"
                  className="w-full h-96 object-cover opacity-80"
                />

                <div className="absolute top-20 left-20 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                <div
                  className="absolute top-40 right-32 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-32 left-40 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-emerald-800 to-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join Your Community?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start building connections today!
          </p>
          <button className="bg-white text-emerald-800 px-10 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition shadow-xl">
            Get Started Now
          </button>
        </div>
      </section>

      <footer className="bg-emerald-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Neighbour Net</h3>
            <p className="text-emerald-200 text-sm">
              Building stronger communities, one connection at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-emerald-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-emerald-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-emerald-200 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-emerald-800 text-center text-emerald-300 text-sm">
          © 2025 Neighbour Net. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
