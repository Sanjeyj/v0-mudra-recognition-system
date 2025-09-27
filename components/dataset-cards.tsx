import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ITEMS = [
  {
    title: "Dance Forms",
    desc: "Bharatanatyam, Kathak, Kuchipudi, Odissi, Manipuri, Sattriya, Mohiniyattam",
  },
  {
    title: "Classes",
    desc: "Multiple mudra classes per dance form (placeholder)",
  },
  {
    title: "Samples",
    desc: "Images collected across lighting, skin tones, angles (placeholder)",
  },
  {
    title: "Licensing",
    desc: "Dataset usage rights and attribution (placeholder)",
  },
]

export function DatasetCards() {
  return (
    <section aria-labelledby="dataset-info" className="mx-auto w-full max-w-6xl px-4">
      <h2 id="dataset-info" className="mb-4 text-xl font-semibold text-balance">
        Dataset Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <Card key={item.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-pretty">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  )
}
