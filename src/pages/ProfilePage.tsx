import useProfile from "../hooks/useProfile"

export default function ProfilePage() {
  const {error, data: profile, loading} = useProfile()

  if(loading) {
    return '...loading'
  }

  if(error) {
    return <p>Ooops: {error.message}</p>
  }

  if(profile) {
    return (
      <div>
        <h2>Profile Page</h2>
        <p>{profile.display_name}</p>
      </div>
    )
  }

}