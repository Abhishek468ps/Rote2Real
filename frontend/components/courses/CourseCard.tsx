"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { courses } from "@/lib/data";
import { Star } from "lucide-react";

interface Props {
  course: typeof courses[number];
}

const CourseCard = ({ course }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/courses/${course.slug}`}>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
          
          {/* Image Banner Container */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-950">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            
            {/* Top Badge Tags */}
            <div className="absolute top-3 left-3 flex gap-2">
              {course.premium && (
                <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  Premium
                </span>
              )}
              {course.bestseller && (
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  Bestseller
                </span>
              )}
            </div>
          </div>

          {/* Card Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-base sm:text-lg text-white leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
              {course.title}
            </h3>

            <p className="text-xs text-slate-400 mt-1.5 font-medium">
              {course.instructor}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-3 text-xs">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-bold">
                {course.rating}
              </span>
              <span className="text-slate-500">
                ({course.students.toLocaleString()})
              </span>
            </div>

            {/* Price section */}
            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-800/60">
              <span className="font-extrabold text-lg text-white">
                ₹{course.price}
              </span>
              <span className="line-through text-slate-500 text-xs">
                ₹{course.originalPrice}
              </span>
            </div>
          </div>

        </div>
      </Link>

      {/* Desktop Hover Preview Modal */}
      {hovered && (
        <div className="absolute top-4 left-full ml-4 w-80 bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl rounded-2xl p-5 z-50 hidden lg:block animate-in fade-in zoom-in-95 duration-200">
          <h4 className="font-bold text-base text-white">
            {course.title}
          </h4>

          <p className="text-[11px] text-indigo-400 font-semibold mt-1">
            Updated {course.updated}
          </p>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {course.description}
          </p>

          <Link
            href={`/courses/${course.slug}`}
            className="block mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-center py-2.5 rounded-xl font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all"
          >
            View Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseCard;