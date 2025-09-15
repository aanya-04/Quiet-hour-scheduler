// import SessionForm from '@/components/SessionForm'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'

// export default function NewSessionPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <nav className="bg-white dark:bg-gray-800 shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link
//                 href="/dashboard"
//                 className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Dashboard
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <SessionForm />
//         </div>
//       </main>
//     </div>
//   )
// }


// import SessionForm from '@/components/SessionForm'
// import Link from 'next/link'
// import { ArrowLeft } from 'lucide-react'

// export default function NewSessionPage() {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Top Navigation */}
//       <nav className="bg-white dark:bg-gray-800 shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <Link
//                 href="/dashboard"
//                 aria-label="Back to Dashboard"
//                 className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 <ArrowLeft className="w-5 h-5 mr-2" />
//                 Back to Dashboard
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//             Create New Study Session
//           </h1>
//           <SessionForm />
//         </div>
//       </main>
//     </div>
//   )
// }




import { createClient } from "@/lib/supabase/server"; // adjust path if different
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SessionPageProps {
  params: { id: string };
}

export default async function SessionPage({ params }: SessionPageProps) {
  const supabase = createClient();

  // fetch one session by id
  const { data: session, error } = await supabase
    .from("study_sessions")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !session) {
    return (
      <div className="p-6 text-red-500">
        Session not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                aria-label="Back to Dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Session Details */}
      <main className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {session.title}
          </h1>
          {session.description && (
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {session.description}
            </p>
          )}
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Start:</strong>{" "}
              {new Date(session.start_time).toLocaleString()}
            </li>
            <li>
              <strong>End:</strong>{" "}
              {new Date(session.end_time).toLocaleString()}
            </li>
            <li>
              <strong>Duration:</strong> {session.duration_minutes} minutes
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {session.is_active ? "Active" : "Inactive"}
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
