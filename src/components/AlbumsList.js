import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store"
import AlbumsListItems from "./AlbumsListItems";
import Button from "./Button";
import Skeletons from "./Skeletons";

function AlbumsList({user}) {
  const {data, isFetching, error} = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();  
  const handleAddAlbum = () => {
    addAlbum(user);
  }
  let content;

  if(isFetching){
    content = <Skeletons className="h-10 w-full" times={3}/>
  }else if(error){
    content = <div>Error loading albums....</div>
  }else {
    content = data.map(album => {

      return <AlbumsListItems key={album.id} album={album}/>
    });
  }
  return (
    <div>
      <div className="flex flex-row m-2 justify-between items-center">
        <h3 className="text-lg font-bold ">Albums for {user.name}</h3>
      <Button onClick={handleAddAlbum} loading={results.isLoading} className="">+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  )
}

export default AlbumsList