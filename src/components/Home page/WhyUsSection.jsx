// src/components/home/WhyUsSection.jsx
const WHY_US = [
  {
    title: "Academic to Admission",
    desc: "ফিজিক্স, কেমিস্ট্রি, ম্যাথ থেকে শুরু করে ভার্সিটি এডমিশন পর্যন্ত সব বিষয়ের কোর্স এক জায়গায়। দেশ সেরা টিচারদের কাছ থেকে শেখো।",
    border: "border-t-blue-400",
  },
  {
    title: "Innovative Features",
    desc: "লাইভ ক্লাস, প্র্যাকটিস সিট, ডিসকাশন গ্রুপ এবং রিভিশন রেকমেন্ডেশন সহ আমাদের platform তোমার শেখাকে আরো কার্যকর করে তোলে।",
    border: "border-t-purple-400",
  },
  {
    title: "Flexible Learning",
    desc: "লাইভ ক্লাস মিস হলেও চিন্তা নেই। রেকর্ডেড ক্লাস দেখো নিজের সময়মতো। তোমার pace এ শেখো, কেউ পিছিয়ে থাকবে না।",
    border: "border-t-yellow-400",
  },
  {
    title: "Affordable Education",
    desc: "সাশ্রয়ী মূল্যে উচ্চমানের শিক্ষা। competitive pricing এবং free courses এর মাধ্যমে সবার কাছে শিক্ষা পৌঁছে দেওয়াই আমাদের লক্ষ্য।",
    border: "border-t-green-400",
  },
  {
    title: "Exam Preparation",
    desc: "বোর্ড পরীক্ষা ও এডমিশন এর জন্য বিশেষভাবে তৈরি কোর্স। মডেল টেস্ট ও প্র্যাকটিস সিট দিয়ে নিজেকে যাচাই করো।",
    border: "border-t-red-400",
  },
]

export default function WhyUsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-white text-3xl font-bold">কেন আমরাই সেরা?</h2>
        <p className="text-white/40 text-sm mt-2">দেখে নাও সারা দেশের স্টুডেন্টরা কেন আমাদেরই বেছে নেয়</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_US.map((item) => (
          <div
            key={item.title}
            className={`bg-white/5 border border-white/8 border-t-2 ${item.border} rounded-xl p-6 flex flex-col gap-3 hover:bg-white/8 transition duration-300`}
          >
            <div className="w-8 h-0.5 bg-white/20 rounded-full" />
            <h3 className="text-white font-bold text-base">{item.title}</h3>
            <div className="w-8 h-0.5 bg-white/20 rounded-full" />
            <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}