import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* hero section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#3E513E] mb-6">
              Community first.
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with neighbours to share items, find local help, and build
              community - all within walking distance.
            </p>
            <Link
              href="/sign-up"
              className="bg-[#3E513E] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2d3d2d] transition inline-block"
            >
              Get Started
            </Link>
          </div>

          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/neig.jpeg"
              alt="community"
              fill
              className="object-cover"
            />
            {/* <div className="w-full h-full bg-[#3E513E] rounded-2xl flex items-center justify-center p-8">
              <p className="text-white text-lg text-center">community image</p>
            </div>*/}
          </div>
        </div>
      </section>

      {/* how it works section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#3E513E] mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <span className="text-4xl font-bold text-[#3E513E]">01</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Sign Up
            </h3>
            <p className="text-gray-600">
              Create your account and set your neighbourhood location.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <span className="text-4xl font-bold text-[#3E513E]">02</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Post or Browse
            </h3>
            <p className="text-gray-600">
              Share what you need or browse posts from neighbours nearby.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <span className="text-4xl font-bold text-[#3E513E]">03</span>
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              Connect
            </h3>
            <p className="text-gray-600">
              Comment on posts and help out your community.
            </p>
          </div>
        </div>
      </section>

      {/* why join section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#3E513E] mb-8">Why Join?</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-[#3E513E] text-xl">✓</span>
              <p className="text-gray-700">Find help within walking distance</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#3E513E] text-xl">✓</span>
              <p className="text-gray-700">Share items you no longer need</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#3E513E] text-xl">✓</span>
              <p className="text-gray-700">Offer your skills and services</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#3E513E] text-xl">✓</span>
              <p className="text-gray-700">Build real connections locally</p>
            </div>
          </div>

          <div className="relative h-150 rounded-2xl overflow-hidden">
            <Image
              src="/images/car.webp"
              alt="navigating neighborhood"
              fill
              className="object-cover"
            />

            {/*<div className="w-full h-full bg-[#3E513E] rounded-2xl flex items-center justify-center p-8">
              <p className="text-white text-lg text-center">
                neighbourhood image
              </p>
            </div>*/}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-[#3E513E] text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg font-semibold">Neighbour Net</p>
          <p className="text-sm mt-2 opacity-80">
            Connecting communities, one Neighbour at a time
          </p>
        </div>
      </footer>
    </div>
  );
}
