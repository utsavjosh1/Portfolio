import { NextResponse } from 'next/server'
import { SkillService } from '@/lib/services/skills'
import { SkillLevel } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    const grouped = searchParams.get('grouped')
    const top = searchParams.get('top')
    const limit = searchParams.get('limit')

    let skills

    if (grouped === 'true') {
      skills = await SkillService.getSkillsGroupedByCategory()
      return NextResponse.json(skills)
    } else if (top === 'true') {
      const limitNum = limit ? parseInt(limit) : 10
      skills = await SkillService.getTopSkills(limitNum)
    } else if (category) {
      skills = await SkillService.getSkillsByCategory(category)
    } else if (level && Object.values(SkillLevel).includes(level as SkillLevel)) {
      skills = await SkillService.getSkillsByLevel(level as SkillLevel)
    } else {
      skills = await SkillService.getAllSkills()
    }

    // Transform the data to include technology information
    const transformedSkills = skills.map(skill => ({
      ...skill,
      technologyName: skill.technology?.name || null,
      technologyIcon: skill.technology?.icon || null,
      technologyCategory: skill.technology?.category || null
    }))

    return NextResponse.json(transformedSkills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const skill = await SkillService.createSkill(data)
    
    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
} 