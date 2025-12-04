export type Flash = {
  notice?: string
  alert?: string
}

export type User = {
  email: string
}

export type SharedProps = {
  flash: Flash
  user: User | null
}
