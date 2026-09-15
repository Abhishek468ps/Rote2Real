/*
export default function DashboardPage() {
  return (
    <div className="w-full space-y-6 overflow-x-hidden sm:space-y-8">

      <div className="px-1">
        <h1
          className="
            text-2xl
            font-black
            tracking-tight
            text-white
            sm:text-3xl
            md:text-4xl
          "
        >
          Dashboard
        </h1>

        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-gray-400
            sm:text-base
          "
        >
          Welcome to Brain Train Dashboard
        </p>
      </div>

    
      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-4
          sm:grid-cols-2
          sm:gap-5
          lg:grid-cols-3
          xl:grid-cols-4
          xl:gap-6
        "
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              min-w-0
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-white/20
              hover:bg-white/[0.05]
              sm:rounded-3xl
              sm:p-5
              lg:p-6
            "
          >
            <h3
              className="
                truncate
                text-base
                font-semibold
                text-white
                sm:text-lg
              "
            >
              Card {index + 1}
            </h3>

            <p
              className="
                mt-2
                text-sm
                leading-5
                text-gray-400
                sm:mt-3
                sm:text-base
                sm:leading-6
              "
            >
              Dashboard widget placeholder
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}*/


"use client";

import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6 overflow-x-hidden sm:space-y-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="px-1"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="mb-1 text-sm font-medium text-cyan-400">
              Student Workspace
            </p>

            <h1
              className="
                text-2xl
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
                md:text-4xl
              "
            >
              Dashboard
            </h1>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-600
                dark:text-gray-400
                sm:text-base
              "
            >
              Welcome to your Brain Train execution workspace.
            </p>
          </div>

          {/* Status */}

          <div
            className="
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              border
              border-emerald-500/20
              bg-emerald-500/10
              px-3
              py-2
              text-xs
              font-medium
              text-emerald-500
              dark:text-emerald-400
            "
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            Workspace Active
          </div>

        </div>
      </motion.div>


      {/* =====================================================
          WELCOME CARD
      ====================================================== */}

      <DashboardSection
        title="Welcome"
        description="Your personalized Brain Train workspace"
      >

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:backdrop-blur-xl
            sm:p-8
          "
        >

          {/* Glow */}

          <div
            className="
              absolute
              -right-20
              -top-20
              h-48
              w-48
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
          />

          <div className="relative">

            <p className="text-sm font-medium text-cyan-500 dark:text-cyan-400">
              Brain Train
            </p>

            <h2
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900
                dark:text-white
                sm:text-2xl
              "
            >
              Ready to build your next MVP?
            </h2>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-400
              "
            >
              Select an MVP, build your team, complete the execution
              challenges and grow your portfolio.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-indigo-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition
                  hover:scale-[1.02]
                "
              >
                Explore MVPs
              </button>

              <button
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  dark:border-white/10
                  dark:bg-white/5
                  dark:text-slate-200
                  dark:hover:bg-white/10
                "
              >
                View Portfolio
              </button>

            </div>

          </div>
        </div>

      </DashboardSection>


      {/* =====================================================
          STATS ROW
      ====================================================== */}

      <DashboardSection
        title="Your Progress"
        description="Track your learning and execution performance"
      >

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <StatCard
            title="XP"
            value="1,240"
            subtitle="+120 this week"
            icon="⚡"
          />

          <StatCard
            title="Brain Coins"
            value="850"
            subtitle="Available balance"
            icon="🪙"
          />

          <StatCard
            title="Rank"
            value="#42"
            subtitle="Top 10% this month"
            icon="🏆"
          />

          <StatCard
            title="Streak"
            value="7 Days"
            subtitle="Keep it going"
            icon="🔥"
          />

        </div>

      </DashboardSection>


      {/* =====================================================
          ACTIVE MVPs
      ====================================================== */}

      <DashboardSection
        title="Active MVPs"
        description="Your currently active execution projects"
      >

        <div
          className="
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-2
          "
        >

          <MVPCard
            title="AI Student Assistant"
            duration="48 Hours"
            progress={72}
            status="In Progress"
          />

          <MVPCard
            title="Smart Portfolio Platform"
            duration="7 Days"
            progress={35}
            status="In Progress"
          />

        </div>

      </DashboardSection>


      {/* =====================================================
          COUNTDOWN TIMELINE
      ====================================================== */}

      <DashboardSection
        title="Execution Timeline"
        description="Track your upcoming MVP deadlines"
      >

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-sm
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:backdrop-blur-xl
            sm:p-6
          "
        >

          <div className="space-y-5">

            <TimelineItem
              title="AI Student Assistant"
              deadline="18h 42m remaining"
              status="Active"
            />

            <TimelineItem
              title="Portfolio MVP"
              deadline="5d 08h remaining"
              status="Upcoming"
            />

            <TimelineItem
              title="Team Challenge"
              deadline="12d remaining"
              status="Upcoming"
            />

          </div>

        </div>

      </DashboardSection>


      {/* =====================================================
          TEAM WORKSPACE + ACTIVITY
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-2
        "
      >

        {/* Team Workspace */}

        <DashboardSection
          title="Team Workspace"
          description="Collaborate with your MVP team"
        >

          <div
            className="
              min-h-[220px]
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:backdrop-blur-xl
            "
          >

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  AI Student Assistant
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  4 team members
                </p>
              </div>

              <button
                className="
                  rounded-xl
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-slate-700
                  hover:bg-slate-50
                  dark:border-white/10
                  dark:text-slate-300
                  dark:hover:bg-white/10
                "
              >
                Manage Team
              </button>

            </div>

            <div className="mt-8 flex -space-x-3">

              {["M", "A", "R", "S"].map((initial, index) => (

                <div
                  key={index}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    bg-gradient-to-br
                    from-cyan-500
                    to-indigo-600
                    text-sm
                    font-bold
                    text-white
                    dark:border-[#09101f]
                  "
                >
                  {initial}
                </div>

              ))}

            </div>

          </div>

        </DashboardSection>


        {/* Activity Feed */}

        <DashboardSection
          title="Activity Feed"
          description="Recent activity in your workspace"
        >

          <div
            className="
              min-h-[220px]
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              dark:border-white/10
              dark:bg-white/[0.04]
              dark:backdrop-blur-xl
            "
          >

            <div className="space-y-5">

              <ActivityItem
                title="MVP task completed"
                description="Database schema completed"
                time="10 min ago"
              />

              <ActivityItem
                title="Team member joined"
                description="Rahul joined your MVP team"
                time="1 hour ago"
              />

              <ActivityItem
                title="XP earned"
                description="+50 XP earned from challenge"
                time="3 hours ago"
              />

            </div>

          </div>

        </DashboardSection>

      </div>


      {/* =====================================================
          AI MENTOR
      ====================================================== */}

      <DashboardSection
        title="AI Mentor"
        description="Your intelligent execution assistant"
      >

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-indigo-500/20
            bg-gradient-to-br
            from-indigo-500/10
            via-purple-500/10
            to-cyan-500/10
            p-6
            dark:border-indigo-400/20
            sm:p-8
          "
        >

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-indigo-500
                    to-cyan-500
                    text-xl
                  "
                >
                  AI
                </div>

                <div>

                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Brain Train AI Mentor
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ready to help
                  </p>

                </div>

              </div>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-6
                  text-slate-600
                  dark:text-slate-400
                "
              >
                Get guidance on your MVP execution, technical challenges,
                team collaboration and portfolio development.
              </p>

            </div>

            <button
              className="
                rounded-xl
                bg-indigo-500
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-indigo-600
              "
            >
              Ask AI Mentor
            </button>

          </div>

        </div>

      </DashboardSection>


      {/* =====================================================
          PORTFOLIO PROGRESS
      ====================================================== */}

      <DashboardSection
        title="Portfolio Progress"
        description="Build your professional profile through execution"
      >

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-sm
            dark:border-white/10
            dark:bg-white/[0.04]
            dark:backdrop-blur-xl
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Portfolio Completion
              </p>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Keep completing MVPs to improve your profile.
              </p>

            </div>

            <span className="text-lg font-bold text-cyan-500">
              68%
            </span>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{
                duration: 1,
                delay: 0.2,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-cyan-500
                via-indigo-500
                to-purple-500
              "
            />

          </div>

        </div>

      </DashboardSection>


      {/* =====================================================
          ACHIEVEMENTS
      ====================================================== */}

      <DashboardSection
        title="Achievements"
        description="Milestones unlocked through your execution journey"
      >

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            lg:grid-cols-5
          "
        >

          <Achievement
            icon="🚀"
            title="First MVP"
            unlocked
          />

          <Achievement
            icon="🔥"
            title="7 Day Streak"
            unlocked
          />

          <Achievement
            icon="⚡"
            title="1000 XP"
            unlocked
          />

          <Achievement
            icon="👥"
            title="Team Builder"
            unlocked={false}
          />

          <Achievement
            icon="🏆"
            title="MVP Master"
            unlocked={false}
          />

        </div>

      </DashboardSection>

    </div>
  );
}


/* =========================================================
   REUSABLE SECTION
========================================================= */

function DashboardSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">

      <div className="px-1">

        <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}


/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-colors
        dark:border-white/10
        dark:bg-white/[0.04]
        dark:backdrop-blur-xl
      "
    >

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-xs text-slate-400">
          This month
        </span>

      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-emerald-500 dark:text-emerald-400">
        {subtitle}
      </p>

    </motion.div>
  );
}


/* =========================================================
   MVP CARD
========================================================= */

function MVPCard({
  title,
  duration,
  progress,
  status,
}: {
  title: string;
  duration: string;
  progress: number;
  status: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-white/10
        dark:bg-white/[0.04]
        dark:backdrop-blur-xl
      "
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="text-xs font-medium text-cyan-500 dark:text-cyan-400">
            {duration} MVP
          </p>

          <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h3>

        </div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-500">
          {status}
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-xs">

          <span className="text-slate-500 dark:text-slate-400">
            Progress
          </span>

          <span className="font-semibold text-slate-700 dark:text-white">
            {progress}%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${progress}%`,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              to-indigo-500
            "
          />

        </div>

      </div>

    </motion.div>
  );
}


/* =========================================================
   TIMELINE ITEM
========================================================= */

function TimelineItem({
  title,
  deadline,
  status,
}: {
  title: string;
  deadline: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
        ⏱
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {deadline}
        </p>

      </div>

      <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
        {status}
      </span>

    </div>
  );
}


/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex gap-3">

      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" />

      <div className="min-w-0">

        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {time}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   ACHIEVEMENT
========================================================= */

function Achievement({
  icon,
  title,
  unlocked,
}: {
  icon: string;
  title: string;
  unlocked: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`
        rounded-2xl
        border
        p-4
        text-center
        transition
        ${
          unlocked
            ? "border-cyan-500/20 bg-cyan-500/5"
            : "border-slate-200 bg-slate-50 opacity-50 dark:border-white/10 dark:bg-white/[0.03]"
        }
      `}
    >

      <div className="text-3xl">
        {icon}
      </div>

      <p className="mt-3 text-xs font-semibold text-slate-900 dark:text-white">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
        {unlocked ? "Unlocked" : "Locked"}
      </p>

    </motion.div>
  );
}