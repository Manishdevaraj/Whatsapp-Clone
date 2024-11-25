import { format, formatDistanceToNow } from 'date-fns';
//   relative time hours ago
export function formatRelativeTime(timestamp) {
  try
  {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  }
  catch(err)
  {
    // console.log(err);
  }
}

// acurate time
export function formatTime(timestamp) {
  try
  {
    return format(new Date(timestamp), 'h:mm a');
  }
  catch(err)
  {
    // console.log(err);
  }
}
