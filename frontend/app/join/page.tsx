"use client";

import RoleCard from "@/components/auth/RoleCard";
import { ROLES } from "@/components/auth/roles";

export default function JoinPage() {
  return (
    <main className="
    min-h-screen
    bg-[#050816]
    relative
    overflow-hidden
    text-white
    ">

      {/* Background */}
      <div className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_top_left,#312e81_0%,transparent_40%)]
      opacity-40
      " />

      <div className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_bottom_right,#0ea5e9_0%,transparent_35%)]
      opacity-30
      " />

      <div
  className="
  absolute inset-0
  bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
  bg-[size:80px_80px]
  opacity-30
  animate-gridMove
  "
/>

<div className="
absolute top-20 left-20
w-96 h-96
bg-indigo-600/20
rounded-full
blur-[140px]
animate-floatSlow
"/>

<div className="
absolute bottom-20 right-20
w-[500px] h-[500px]
bg-cyan-500/20
rounded-full
blur-[160px]
animate-floatReverse
"/>



      <div className="
      relative
      max-w-7xl
      mx-auto
      px-6
      py-32
      ">

        {/* Hero */}

        <div className="text-center max-w-4xl mx-auto">

          <div className="
          inline-flex
          items-center
          rounded-full
          border
          border-indigo-500/30
          bg-indigo-500/10
          px-5
          py-2
          text-sm
          text-indigo-300
          ">
            AI Powered Identity & Access Platform
          </div>

         <h1 className="
mt-8
text-6xl
md:text-8xl
font-black
leading-tight
tracking-tight
">
  Build Your Future With

  <span className="
  block
  bg-gradient-to-r
  from-indigo-400
  via-cyan-400
  to-blue-500
  bg-clip-text
 text-transparent
bg-[length:200%_200%]
animate-gradientShift
  ">
    Brain Train AI
  </span>
</h1>

          <p className="
          mt-8
          text-xl
          text-gray-400
          leading-9
          ">
            One identity for education,
            AI engineering,
            internships,
            recruitment,
            healthcare,
            legal services,
            consulting,
            research and innovation.
          </p>


          <div className="
mt-12
flex
flex-col
sm:flex-row
justify-center
gap-5
">
  <button className="
px-10 py-5
rounded-2xl
bg-gradient-to-r
from-indigo-600
to-cyan-500
font-bold
shadow-2xl
shadow-indigo-500/30
hover:shadow-cyan-500/40
hover:-translate-y-2
hover:scale-105
transition-all
duration-300
">
    Join Now
  </button>

  <button className="
  px-10 py-5
  rounded-2xl
  border border-white/10
  bg-white/[0.03]
  backdrop-blur-xl
hover:-translate-y-2
hover:border-cyan-400/50
transition-all
duration-300
  ">
    Explore Ecosystem
  </button>
</div>

        </div>

        {/* Stats */}

        <div className="
        mt-20
        grid
        grid-cols-2
        md:grid-cols-4
        gap-6
        ">
          {[
            ["10+", "User Roles"],
            ["25+", "Products"],
            ["100+", "Industry Projects"],
            ["AI", "Powered Platform"],
          ].map(([value, label]) => (
            <div
              key={label}
     className="
group
rounded-3xl
border
border-white/10
bg-white/[0.04]
backdrop-blur-xl
p-8
text-center
hover:scale-105
hover:-translate-y-3
hover:border-indigo-500/50
hover:shadow-2xl
hover:shadow-indigo-500/20
transition-all
duration-300
"
            >
              <h3 className="
text-5xl
font-black
bg-gradient-to-r
from-indigo-400
to-cyan-400
bg-clip-text
text-transparent
">
                {value}
              </h3>

              <p className="mt-2 text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Roles */}

        <div className="
w-32
h-1
mx-auto
mt-24
rounded-full
bg-gradient-to-r
from-indigo-500
to-cyan-500
"/>

        <div className="mt-24">

          <h2 className="
          text-4xl
          font-bold
          text-center
          ">
            Choose Your Role
          </h2>

          <p className="
          text-center
          text-gray-400
          mt-4
          ">
            Select the identity that best matches your journey.
          </p>

          <div className="
flex
flex-wrap
justify-center
gap-3
mt-10
">
  {[
    "Education",
    "Healthcare",
    "Legal",
    "Recruitment",
    "Industry",
    "Research",
  ].map((item) => (
    <div
      key={item}
      className="
      px-5 py-2
      rounded-full
      border border-white/10
      bg-white/[0.03]
      text-sm
      text-gray-300
      "
    >
      {item}
    </div>
  ))}
</div>

<div className="
flex
justify-center
mb-10
">
  <div className="
  px-6 py-3
  rounded-full
  bg-indigo-500/10
  border border-indigo-500/30
  text-indigo-300
  text-sm
  ">
    10 Public Registration Roles Available
  </div>
</div>

          <div className="
          mt-16
          grid
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
          ">
            {ROLES.map((role) => (
              <RoleCard
                key={role.title}
                role={role as any}
              />
            ))}
          </div>

        </div>
     <div className="
mt-32
text-center
text-gray-500
text-sm
">
  Powered by Brain Train AI Ecosystem •
  Adaptive Intelligence Platform
</div>
      </div>
    </main>
  );
}