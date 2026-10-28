import React, { useState, useRef } from "react";

function Video({ url, channel, avatar, description, song, likes, messages, shares, bookmarks }) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);
  const [following, setFollowing] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([
    { user: "ali_dev", text: "Brilliant UI styling! 🔥" },
    { user: "sarah_t", text: "This looks exactly like real TikTok website 🚀" },
    { user: "coach_ali", text: "Clean React code structure 💯" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleDoublePress = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((parseInt(likeCount) || 120) + 1);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikeCount(Math.max(0, parseInt(likeCount) - 1));
    } else {
      setLiked(true);
      setLikeCount((parseInt(likeCount) || 0) + 1);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (bookmarked) {
      setBookmarked(false);
      setBookmarkCount(Math.max(0, parseInt(bookmarkCount) - 1));
    } else {
      setBookmarked(true);
      setBookmarkCount((parseInt(bookmarkCount) || 0) + 1);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Video link copied to clipboard!");
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "arbab_user", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', paddingBottom: '30px', borderBottom: '1px solid #2f2f2f', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      
      {/* Channel Profile Avatar */}
      <div style={{ cursor: 'pointer', flexShrink: '0' }}>
        <img src={avatar || "https://picsum.photos/50/50"} alt="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #333' }} />
      </div>

      {/* Main Content & Video Container */}
      <div style={{ flex: '1' }}>
        
        {/* Creator Info & Follow Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>{channel}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>· 2h ago</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: '1.4', color: '#e1e1e1' }}>{description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#fff', marginTop: '6px', cursor: 'pointer' }}>
              <span role="img" aria-label="musical note">🎵</span>
              <span style={{ textDecoration: 'underline' }}>{song}</span>
            </div>
          </div>
          <button onClick={() => setFollowing(!following)} style={{ background: following ? 'transparent' : 'none', border: following ? '1px solid #777' : '1px solid #FE2C55', color: following ? '#fff' : '#FE2C55', padding: '6px 20px', borderRadius: '4px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', transition: '0.2s' }}>
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Video Wrapper & Player */}
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
          
          <div onClick={handleVideoPress} onDoubleClick={handleDoublePress} style={{ position: 'relative', width: '320px', height: '560px', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <video ref={videoRef} loop muted playsInline src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
            
            {/* Play/Pause Center Indicator */}
            {!playing && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', color: 'white' }}>
                ▶
              </div>
            )}

            {/* Double Tap Heart Animation */}
            {showHeartAnim && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '80px', animation: 'scaleUp 0.8s ease-in-out' }}>
                ❤️
              </div>
            )}

            {/* Floating Sound Record Disc at bottom right of video */}
            <div style={{ position: 'absolute', right: '12px', bottom: '15px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#222', border: '5px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fff' }}></div>
            </div>
          </div>

          {/* Right Action Bar (Like, Comments, Bookmark, Share) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', paddingBottom: '10px' }}>
            
            {/* Like */}
            <div onClick={handleLike} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2f2f2f', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px', transition: '0.2s' }}>
                <span role="img" aria-label="like" style={{ filter: liked ? 'none' : 'grayscale(100%)' }}>❤️</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ccc' }}>{likeCount}</span>
            </div>

            {/* Comment */}
            <div onClick={() => setCommentOpen(!commentOpen)} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2f2f2f', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                <span role="img" aria-label="comments">💬</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ccc' }}>{comments.length + 40}</span>
            </div>

            {/* Bookmark */}
            <div onClick={handleBookmark} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2f2f2f', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                <span role="img" aria-label="bookmark" style={{ filter: bookmarked ? 'none' : 'grayscale(100%)' }}>⭐</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ccc' }}>{bookmarkCount}</span>
            </div>

            {/* Share */}
            <div onClick={handleShare} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#2f2f2f', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                <span role="img" aria-label="share">↗️</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ccc' }}>Share</span>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Comments Drawer / Popup */}
      {commentOpen && (
        <div style={{ position: 'fixed', right: '0', top: '65px', width: '400px', height: 'calc(100vh - 65px)', backgroundColor: '#1a1a1a', borderLeft: '1px solid #2f2f2f', zIndex: '1100', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '-5px 0 25px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: '1px solid #2f2f2f' }}>
            <h3 style={{ margin: '0', fontSize: '16px' }}>{comments.length} comments</h3>
            <button onClick={() => setCommentOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ flex: '1', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {comments.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#333', flexShrink: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                  {c.user[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#aaa', fontSize: '13px' }}>@{c.user}</div>
                  <div style={{ marginTop: '3px', color: '#eee' }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} style={{ padding: '15px 20px', borderTop: '1px solid #2f2f2f', display: 'flex', gap: '10px', backgroundColor: '#161616' }}>
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add comment..." style={{ flex: '1', backgroundColor: '#2f2f2f', border: 'none', borderRadius: '4px', padding: '10px 14px', color: 'white', outline: 'none' }} />
            <button type="submit" style={{ backgroundColor: '#FE2C55', color: 'white', border: 'none', padding: '0 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Post</button>
          </form>
        </div>
      )}

    </div>
  );
}
export default Video;
