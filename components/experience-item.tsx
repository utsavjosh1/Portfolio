import { Card, CardContent } from "@/components/ui/card"

interface ExperienceItemProps {
  company: string
  position: string
  period: string
  description: string
}

export function ExperienceItem({ company, position, period, description }: ExperienceItemProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-semibold">{position}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          <p className="text-sm text-muted-foreground">{period}</p>
        </div>
        <p className="mt-2 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
