export type Flash = {
  notice?: string
  alert?: string
}

export type User = {
  name: string
  email: string
}

export type SharedProps = {
  flash: Flash
  user: User | null
}
