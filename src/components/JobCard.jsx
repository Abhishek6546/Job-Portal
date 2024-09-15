/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import {  deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;


// import { useUser } from "@clerk/clerk-react";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
// import { Heart, MapPinIcon } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import useFetch from "@/hooks/use-fetch";
// import { useEffect, useState } from "react";
// import { saveJob } from "../api/apiJobs";

// const JobCard = ({
//     job,
//     isMyJob = false,
//     savedInit = false,
//     onJobSaved = () => {},
// }) => {
//     const [saved, setSaved] = useState(savedInit);
//     const { user } = useUser();

//     // Using the custom useFetch hook for saving/unsaving the job
//     const {
//         loading: loadingSavedJob,
//         data: savedJob,
//         fn: fnSavedJob,
//     } = useFetch(saveJob);

//     const handleSaveJob = async () => {
//         // Toggle the saved state for the job
//         const alreadySaved = saved; // Use current saved state

//         // Call the saveJob API
//         await fnSavedJob({
//             alreadySaved, // Pass whether the job is already saved
//             saveData: {
//                 user_id: user.id,
//                 job_id: job.id,
//             },
//         });

//         // Update the saved state based on the action (toggle saved state)
//         setSaved(!alreadySaved);

//         // Trigger any callback for job saved/unsaved
//         onJobSaved();
//     };

//     useEffect(() => {
//         if (savedJob !== undefined) {
//             // Update the saved state based on the API response if needed
//             setSaved(savedJob?.length > 0);
//         }
//     }, [savedJob]);

//     return (
//         <Card className="flex flex-col">
//             <CardHeader className="flex">
//                 <CardTitle className="flex justify-between font-bold">
//                     {job.title}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-4 flex-1">
//                 <div className="flex justify-between">
//                     {job.company && <img src={job.company.logo_url} className="h-6" />}
//                     <div className="flex gap-2 items-center">
//                         <MapPinIcon size={15} /> {job.location}
//                     </div>
//                 </div>
//                 <hr />
//                 {job.description.substring(0, job.description.indexOf("."))}.
//             </CardContent>
//             <CardFooter className="flex gap-2">
//                 <Link to={`/job/${job.id}`} className="flex-1">
//                     <Button variant="secondary" className="w-full">
//                         More Details
//                     </Button>
//                 </Link>
//                 {!isMyJob && (
//                     <Button
//                         variant="outline"
//                         className="w-15"
//                         onClick={handleSaveJob}
//                         disabled={loadingSavedJob}
//                     >
//                         {saved ? (
//                             <Heart size={20} fill="red" stroke="red" />
//                         ) : (
//                             <Heart size={20} />
//                         )}
//                     </Button>
//                 )}
//             </CardFooter>
//         </Card>
//     );
// };

// export default JobCard;
