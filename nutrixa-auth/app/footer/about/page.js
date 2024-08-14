import Members, {members} from './members' 

export default function About()
{
   return(
    <main>
        <div>
            Meet the Nutrixa Team!
            <h1>
                <Members />
            </h1>
        </div>
    </main>
   )
}
