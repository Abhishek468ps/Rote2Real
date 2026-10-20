"use client";
import Image from "next/image";
import { FaRegNewspaper } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState, useEffect } from "react";

const blogs = [
  {
    title: "AI Trends 2025",
    author: "Monika Singh",
    date: "Oct 15, 2025",
    img: "/blog1.jpg",
    description: "Explore the upcoming trends in AI and how businesses can leverage them.",
    color: "text-blue-400"
  },
  {
    title: "Data Analytics in Enterprises",
    author: "Rajesh Kumar",
    date: "Sep 28, 2025",
    img: "/blog2.jpg",
    description: "Learn how data analytics can transform decision-making in large organizations.",
    color: "text-green-400"
  },
  {
    title: "Automation Best Practices",
    author: "Sophia Lee",
    date: "Aug 12, 2025",
    img: "/blog3.jpg",
    description: "Discover best practices for implementing automation efficiently in business processes.",
    color: "text-yellow-400"
  },
];

// Individual Blog Card with 3D tilt
const BlogCard = ({ blog }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posX = e.clientX - rect.left - rect.width / 2;
        const posY = e.clientY - rect.top - rect.height / 2;
        x.set(posX);
        y.set(posY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative w-80 sm:w-96 md:w-80 lg:w-96 bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl overflow-hidden cursor-grab transition-transform"
    >
      <div className="relative w-full h-56">
        <Image src={blog.img} alt={blog.title} fill className="object-cover" />
      </div>
      <div className="p-6 text-left">
        <div className={`mb-3 ${blog.color}`}>
          <FaRegNewspaper size={24} />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h3>
        <p className="text-gray-500 text-sm mb-4">By {blog.author} | {blog.date}</p>
        <p className="text-gray-700 mb-4">{blog.description}</p>
        <button className="text-indigo-600 font-semibold hover:underline">Read More →</button>
      </div>
    </motion.div>
  );
};

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === blogs.length - 1 ? 0 : prev + 1));

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Auto loop every 4 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div {...handlers} className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12">Latest Blogs</h2>

        <div className="relative flex justify-center items-center h-96">
          {blogs.map((blog, idx) => {
            let offset = idx - currentIndex;
            if (offset < -1) offset += blogs.length;
            if (offset > 1) offset -= blogs.length;

            const scale = offset === 0 ? 1 : 0.8;
            const xPos = offset * 300;

            return (
              <motion.div
                key={idx}
                animate={{ x: xPos, scale, opacity: scale === 1 ? 1 : 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0"
              >
                <BlogCard blog={blog} />
              </motion.div>
            );
          })}
        </div>

        {/* Indicators */}
        <div className="mt-6 flex justify-center gap-4">
          {blogs.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                idx === currentIndex ? "bg-indigo-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
