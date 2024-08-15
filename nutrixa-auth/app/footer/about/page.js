import Members from './members' 

export default function About()
{
   return(
    <main className='flex flex-col items-center justify-center min-h-screen'>
        <div className='text-center max-w-2xl'>
            <h1 className='mb-8 underline font-semibold'>Our mission statement</h1>
                <p className='mb-16'>
                    The developers of  Nutrixa sought out to eliminate the guesswork and effort needed to plan day-by-day meals and routines by providing it with a click of a button.  
                    With our app, we aim to offer a central experience to manage dietary needs based on each of your personal goals or to manage any preexisting medical conditions. 
                    Our algorithm is designed to create a personalized diet plan for users with additional tips for their health goals.
                    Nutrixa users are armed with the knowledge of what will work best for their body, in order to confidently lead healthy lives. 
                    Welcome to Nutrixa.
                </p>
                    <h2 className='underline font-semibold'>Meet the Team </h2>
                    
                    <h3>
                        <Members />
                    </h3>
        </div>
    </main>
   )
}