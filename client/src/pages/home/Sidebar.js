import React from 'react';
import '../../styles/pages/home/Sidebar.css'
import RecentPosts from '../../components/home/blogPage/sideBar/RecentPosts';
import FeaturedVideos from '../../components/home/blogPage/sideBar/FeaturedVideos';
import Categories from '../../components/home/blogPage/sideBar/Categories';


const BlogSidebar = () => {

  // Sample data for trending posts
  const trendingPosts = [
    { 
      id: 1, 
      title: "Investment Strategies in Real Estate Market 2024", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 28, 2024",
      views: 1234
    },
    { 
      id: 2, 
      title: "Essential Tips for First-Time Home Buyers", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 25, 2024",
      views: 956
    },
    { 
      id: 3, 
      title: "Understanding Property Market Trends", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 23, 2024",
      views: 847
    }
  ];

  // Sample data for recent posts
  const recentPosts = [
    { 
      id: 1, 
      title: "Investment Strategies in Real Estate Market 2024", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 28, 2024",
      views: 1234
    },
    { 
      id: 2, 
      title: "Essential Tips for First-Time Home Buyers", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 25, 2024",
      views: 956
    },
    { 
      id: 3, 
      title: "Understanding Property Market Trends", 
      image: require("../../assets/images/home/property-image.svg").default,
      date: "Oct 23, 2024",
      views: 847
    }
  ];

  // Sample data for featured videos
  const featuredVideos = [
    {
      id: 1,
      title: "How to Evaluate Property Value",
      thumbnail: require("../../assets/videos/peeman_video.mp4").default,
      duration: "10:25",
      views: "15K"
    },
    {
      id: 2,
      title: "Real Estate Investment Guide",
      thumbnail: require("../../assets/videos/peeman_video.mp4").default,
      duration: "8:15",
      views: "12K"
    }
  ];

  // Sample categories with post counts
  const categories = [
    { name: "Real Estate", count: 45 },
    { name: "Investment", count: 32 },
    { name: "Market Analysis", count: 28 },
    { name: "Property Tips", count: 24 }
  ];

  return (
    <aside className="blog-sidebar">
      <div className="blog-widget">
        <h3>Trending</h3>
        <ul>
          {trendingPosts.map(post => (
            <li key={post.id}>
              <img src={post.image} alt={post.title} />
              <p>{post.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <RecentPosts posts={recentPosts} />
      <FeaturedVideos videos={featuredVideos} />
      <Categories categories={categories} />
    </aside>
  );
};

export default BlogSidebar;


// import React from 'react';
// import '../../../styles/components/home/blogPage/Sidebar.css';

// const Sidebar = () => {
//   const recentPosts = [
//     { id: 1, title: "Investment Strategies in Real Estate", image: "/images/investment.jpg" },
//     { id: 2, title: "Tips for First-Time Buyers", image: "/images/first-time-buyers.jpg" },
//     // Add more recent posts
//   ];

//   return (
//     <aside className="blog-sidebar">
//       <div className="blog-widget">
//         <h3>Recent Posts</h3>
//         <ul>
//           {recentPosts.map(post => (
//             <li key={post.id}>
//               <img src={post.image} alt={post.title} />
//               <p>{post.title}</p>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="blog-widget">
//         <h3>Most Viewed Videos</h3>
//         {/* Add similar code for videos */}
//         <ul>
//           {/* Example Video Section */}
//           <li>Video Placeholder 1</li>
//           <li>Video Placeholder 2</li>
//         </ul>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
