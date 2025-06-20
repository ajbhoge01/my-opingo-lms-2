// lib/drupal.ts
import axios from "axios"

const BASE_URL = "http://my-opigno-site.ddev.site/jsonapi" // update if needed

export async function getCourses() {
  try {
    const res = await axios.get(`${BASE_URL}/group/opigno_course?include=field_course_image,field_course_video`)
    return res.data.data
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export async function getCourse(slug: string) {
  try {
    const res = await axios.get(
      `${BASE_URL}/group/opigno_course?filter[field_slug]=${slug}&include=field_course_image,field_course_video,field_course_modules`,
    )
    return res.data.data[0]
  } catch (error) {
    console.error("Error fetching course:", error)
    return null
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    const res = await axios.get(
      `${BASE_URL}/group/opigno_course?include=field_course_image,field_course_video,field_course_modules,field_course_description`,
    )
    const courses = res.data.data
    return courses.find(
      (course: any) =>
        course.attributes.path?.alias?.endsWith(slug) || course.attributes.field_slug === slug || course.id === slug,
    )
  } catch (error) {
    console.error("Error fetching course by slug:", error)
    return null
  }
}

export async function getCourseModules(courseId: string) {
  try {
    const res = await axios.get(
      `${BASE_URL}/group/opigno_module?filter[field_course.id]=${courseId}&include=field_module_video,field_module_content`,
    )
    return res.data.data
  } catch (error) {
    console.error("Error fetching course modules:", error)
    return []
  }
}

// Helper function to extract YouTube video ID from URL
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to get video thumbnail
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
