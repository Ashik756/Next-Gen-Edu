// src/components/home/CategorySection.jsx
const CATEGORIES = [
  {
    title: "এইচএসসি লেভেল",
    desc: "ফিজিক্স, কেমিস্ট্রি ও ম্যাথ এর বিভিন্ন সাইক্লিক ভিত্তিক কোর্স ও ফাইনাল রিভিশন ব্যাচ, যা তোমার এইচএসসি এর প্রস্তুতি কে দৃঢ় করবে।",
    icon: "📚",
    bg: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/20",
  },
  {
    title: "এডমিশন",
    desc: "ভার্সিটি, ইঞ্জিনিয়ারিং ও মেডিকেল এডমিশন কোর্স যেখানে লাইভ ক্লাস, প্র্যাকটিস সিট ও ডিসকাশন গ্রুপ এর মাধ্যমে তোমার প্রস্তুতি কে অন্য মাত্রায় নিয়ে যাও।",
    icon: "🎓",
    bg: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    iconBg: "bg-green-500/20",
  },
  {
    title: "অফলাইন এক্সাম ব্যাচ",
    desc: "দেশজুড়ে ১৪ টি ব্রাঞ্চ ভার্সিটি, ইঞ্জিনিয়ারিং, মেডিকেল ও বিভিন্ন ভার্সিটির ভর্তি পরীক্ষার অনুরূপ পরীক্ষা দিয়ে নিজেকে যাচাই করে নাও।",
    icon: "📝",
    bg: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    iconBg: "bg-purple-500/20",
  },
  {
    title: "স্কিলস",
    desc: "প্রোগ্রামিং এ আগ্রহী? আমাদের রয়েছে বুটক্যাম্প এবং কম্পিটিটিভ প্রোগ্রামিং এর কোর্স।",
    icon: "⚙️",
    bg: "from-white/10 to-white/5",
    border: "border-white/10",
    iconBg: "bg-white/10",
  },
]

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="text-center mb-10">
        <h2 className="text-white text-3xl font-bold">এগিয়ে রাখ নিজেকে</h2>
        <p className="text-white/40 text-sm mt-2">দেশ সেরা টিচার প্যানেল নিয়ে আমরা আছি তোমাদের সাথে</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className={`bg-gradient-to-br ${cat.bg} border ${cat.border} rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition duration-300 cursor-pointer`}
          >
            <div className={`w-14 h-14 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl`}>
              {cat.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-white font-bold text-lg">{cat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}