import React, { useState, useEffect, useRef } from "react";

// --- TRANSLATIONS DICTIONARY ---
const translations = {
  EN: { title: "TikTok Pro", forYou: "For You", following: "Following", explore: "Explore", live: "LIVE", inbox: "Inbox", studio: "Creator Studio", upload: "+ Upload", search: "Search accounts, videos & sounds", sendGift: "Send Gift 🎁" },
  UR: { title: "ٹک ٹاک پرو", forYou: "آپ کے لیے", following: "فالوئنگ", explore: "ایکسپلور", live: "لائیو", inbox: "ان باکس", studio: "کری ایٹر سٹوڈیو", upload: "+ اپ لوڈ", search: "اکاؤنٹس، ویڈیوز اور آوازیں تلاش کریں", sendGift: "تحفہ بھیجیں 🎁" },
  AR: { title: "تيك توك برو", forYou: "لك", following: "المتابِعون", explore: "استكشاف", live: "مباشر", inbox: "البريد الوارد", studio: "استوديو المبدعين", upload: "+ رفع", search: "البحث عن الحسابات والفيديوهات", sendGift: "إرسال هدية 🎁" },
  ES: { title: "TikTok Pro", forYou: "Para Ti", following: "Siguiendo", explore: "Explorar", live: "EN VIVO", inbox: "Bandeja", studio: "Creator Studio", upload: "+ Subir", search: "Buscar cuentas y videos", sendGift: "Enviar Regalo 🎁" }
};

// --- ULTIMATE VIDEO COMPONENT ---
function Video({ url, channel, avatar, description, song, likes, messages, shares, bookmarks, isActive, onOpenProfile, onOpenSound, onOpenDuet, onOpenGiftStore, onOpenAnalytics, onDownload, onShare, autoScroll, onVideoEnded, onAvatarClick }) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);
  const [following, setFollowing] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [pollVoted, setPollVoted] = useState(false);
  const [pollOption, setPollOption] = useState(null);
  const [showPoll, setShowPoll] = useState(true);

  // Timeline Scrubber State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  const [comments, setComments] = useState([
    { user: "alex_dev", text: "Pro UI Glassmorphism & Analytics live! 🔥" },
    { user: "sarah_code", text: "Production grade styling & smooth UX 🚀" },
    { user: "dev_guy", text: "Absolute masterpiece 💯" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [showHeartAnim, setShowHeartAnim] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      if (isActive) {
        videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isActive, playbackSpeed]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
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

  const handleVote = (e, option) => {
    e.stopPropagation();
    setPollVoted(true);
    setPollOption(option);
    setTimeout(() => {
      setShowPoll(false);
    }, 1500);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments([...comments, { user: "alex_dev", text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', paddingBottom: '35px', borderBottom: '1px solid rgba(255,255,255,0.08)', maxWidth: '640px', width: '100%', margin: '0 auto', position: 'relative' }}>
      
      {/* Channel Avatar */}
      <div onClick={() => onAvatarClick(channel)} style={{ cursor: 'pointer', flexShrink: '0', position: 'relative' }} title="Click to view story">
        <img src={avatar || "https://picsum.photos/50/50"} alt="avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FE2C55', boxShadow: '0 0 15px rgba(254,44,85,0.5)' }} />
        <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', backgroundColor: '#FE2C55', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', color: '#fff', border: '2px solid #000' }}>
          ✨
        </div>
      </div>

      {/* Main Content & Video Container */}
      <div style={{ flex: '1' }}>
        
        {/* Creator Info Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span onClick={() => onOpenProfile(channel)} style={{ fontWeight: '800', fontSize: '16px', cursor: 'pointer', color: '#fff', letterSpacing: '-0.3px' }}>{channel}</span>
              <span style={{ fontSize: '11px', color: '#FE2C55', backgroundColor: 'rgba(254,44,85,0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>PRO</span>
            </div>
            <p style={{ margin: '6px 0 0 0', fontSize: '14px', lineHeight: '1.4', color: '#e1e1e1' }}>{description}</p>
            <div onClick={() => onOpenSound(song)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#25f4ee', marginTop: '6px', cursor: 'pointer', fontWeight: '500' }}>
              <span role="img" aria-label="musical note">🎵</span>
              <span style={{ textDecoration: 'none' }}>{song}</span>
            </div>
          </div>
          <button onClick={() => setFollowing(!following)} style={{ background: following ? 'rgba(255,255,255,0.1)' : 'linear-gradient(45deg, #FE2C55, #ff0050)', border: 'none', color: '#fff', padding: '8px 22px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: following ? 'none' : '0 4px 15px rgba(254,44,85,0.4)' }}>
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Video Wrapper */}
        <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-end' }}>
          
          <div style={{ position: 'relative', width: '330px', height: '580px', backgroundColor: '#0a0a0a', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <video 
              ref={videoRef} 
              loop={!autoScroll} 
              muted={isMuted} 
              playsInline 
              src={url} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={handleVideoPress}
              onDoubleClick={handleDoublePress}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => { if (autoScroll && onVideoEnded) onVideoEnded(); }}
            ></video>
            
            {/* Sound Toggle Button */}
            <div onClick={toggleSound} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', color: '#fff', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)', zIndex: '10' }}>
              {isMuted ? '🔇 Muted' : '🔊 Sound ON'}
            </div>

            {!playing && (
              <div onClick={handleVideoPress} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '26px', color: 'white', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}>
                ▶
              </div>
            )}

            {showPoll && (
              <div style={{ position: 'absolute', top: '65px', left: '15px', right: '15px', backgroundColor: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(12px)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', fontSize: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>
                  {pollVoted ? `✅ Voted: ${pollOption}! (88% Scalable)` : "📊 Dev Poll: Is this code scalable?"}
                </div>
                {!pollVoted && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => handleVote(e, 'Yes')} style={{ flex: 1, backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                      Yes 🔥
                    </button>
                    <button onClick={(e) => handleVote(e, 'No')} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                      No ❌
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Video Timeline Scrubber */}
            <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px', boxSizing: 'border-box' }}>
              <span style={{ fontSize: '10px', color: '#fff', minWidth: '32px', fontFamily: 'monospace' }}>{formatTime(currentTime)}</span>
              <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} style={{ flex: 1, height: '4px', cursor: 'pointer', accentColor: '#FE2C55' }} />
              <span style={{ fontSize: '10px', color: '#aaa', minWidth: '32px', fontFamily: 'monospace' }}>{formatTime(duration)}</span>
            </div>

            {showHeartAnim && (
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '90px', animation: 'scaleUp 0.8s ease-in-out' }}>
                ❤️
              </div>
            )}

          </div>

          {/* Right Action Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', paddingBottom: '12px' }}>
            
            <div onClick={handleLike} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '22px', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s' }}>
                <span role="img" aria-label="like" style={{ filter: liked ? 'none' : 'grayscale(100%)' }}>❤️</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ccc', marginTop: '4px', display: 'block' }}>{likeCount}</span>
            </div>

            <div onClick={() => setCommentOpen(!commentOpen)} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span role="img" aria-label="comments">💬</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ccc', marginTop: '4px', display: 'block' }}>{comments.length + 40}</span>
            </div>

            <div onClick={handleBookmark} style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span role="img" aria-label="bookmark" style={{ filter: bookmarked ? 'none' : 'grayscale(100%)' }}>⭐</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ccc', marginTop: '4px', display: 'block' }}>{bookmarkCount}</span>
            </div>

            {/* 3-Dots More Menu Button */}
            <div onClick={() => setMoreMenuOpen(!moreMenuOpen)} style={{ textAlign: 'center', cursor: 'pointer' }} title="More Actions">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px', color: '#fff', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.12)' }}>
                ⋯
              </div>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#ccc', marginTop: '4px', display: 'block' }}>More</span>
            </div>

          </div>

        </div>

      </div>

      {/* 3-Dots Menu Popup */}
      {moreMenuOpen && (
        <div style={{ position: 'absolute', right: '70px', bottom: '40px', backgroundColor: 'rgba(22,22,22,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '12px', width: '220px', zIndex: '1500', boxShadow: '0 10px 30px rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#888', padding: '4px 8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>⚡ Creator Quick Actions</div>
          
          <div onClick={() => { setMoreMenuOpen(false); onOpenGiftStore(); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span>🎁</span> Send Virtual Gift
          </div>
          <div onClick={() => { setMoreMenuOpen(false); onOpenDuet(url, channel); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span>🪡</span> Duet / Stitch
          </div>
          <div onClick={() => { setMoreMenuOpen(false); onOpenAnalytics({ channel, description, likes: likeCount, messages: comments.length + 40, shares }); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span>📊</span> Video Analytics
          </div>
          <div onClick={() => { setMoreMenuOpen(false); onDownload(); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span>📥</span> Save HD Video
          </div>
          <div onClick={() => { setMoreMenuOpen(false); onShare(); }} style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <span>↗️</span> Copy Link
          </div>
        </div>
      )}

      {/* Comment Drawer */}
      {commentOpen && (
        <div style={{ position: 'fixed', right: '0', top: '68px', width: '420px', height: 'calc(100vh - 68px)', backgroundColor: 'rgba(18,18,18,0.98)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.1)', zIndex: '1100', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '-10px 0 30px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: '0', fontSize: '17px', fontWeight: '800' }}>{comments.length} Comments</h3>
            <button onClick={() => setCommentOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ flex: '1', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {comments.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', fontSize: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2f2f2f', flexShrink: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#FE2C55', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {c.user[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#888', fontSize: '13px' }}>@{c.user}</div>
                  <div style={{ marginTop: '4px', color: '#fff', lineHeight: '1.4' }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} style={{ padding: '18px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px', backgroundColor: 'rgba(10,10,10,0.9)' }}>
            <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." style={{ flex: '1', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '12px 18px', color: 'white', outline: 'none', fontSize: '14px' }} />
            <button type="submit" style={{ backgroundColor: '#FE2C55', color: 'white', border: 'none', padding: '0 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>Post</button>
          </form>
        </div>
      )}

    </div>
  );
}

// --- MASTER ENTERPRISE APP COMPONENT ---
function App() {
  const [activeTab, setActiveTab] = useState("forYou");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("EN");
  const t = translations[lang];

  // Coin Wallet & Modals
  const [coinBalance, setCoinBalance] = useState(7500);
  const [floatingGifts, setFloatingGifts] = useState([]);
  const [getCoinsModal, setGetCoinsModal] = useState(false);
  const [getAppModal, setGetAppModal] = useState(false);
  const [giftStoreModal, setGiftStoreModal] = useState(false);
  const [analyticsModalData, setAnalyticsModalData] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("tiktok_active_user") || "alex_dev";
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authUsername, setAuthUsername] = useState("");

  // Notifications Drawer State
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, type: "like", user: "sarah_code", text: "liked your video", time: "10m ago" },
    { id: 2, type: "follow", user: "tech_guru", text: "started following you", time: "1h ago" },
    { id: 3, type: "comment", user: "code_master", text: "commented: 'Elite Next.js setup! 🔥'", time: "3h ago" }
  ]);

  // 24-HOUR AUTO EXPIRY STORIES STATE
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem("tiktok_pro_24h_stories");
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        const now = Date.now();
        return parsed.filter(s => s.expiresAt > now);
      } catch(e) {}
    }
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return [
      { id: 1, channel: "alex_dev", avatar: "https://picsum.photos/seed/alexdev/100/100", mediaUrl: "https://picsum.photos/seed/mystory/400/700", createdAt: now, expiresAt: now + twentyFourHours, caption: "My official 24h story update! ✨" },
      { id: 2, channel: "tech_guru", avatar: "https://picsum.photos/seed/techguru/100/100", mediaUrl: "https://picsum.photos/seed/story1/400/700", createdAt: now, expiresAt: now + twentyFourHours, caption: "Building Next.js 15 app! 🚀" },
      { id: 3, channel: "sarah_code", avatar: "https://picsum.photos/seed/sarah/100/100", mediaUrl: "https://picsum.photos/seed/story2/400/700", createdAt: now - 3600000, expiresAt: now - 3600000 + twentyFourHours, caption: "Morning coffee & coding ☕" }
    ];
  });

  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [addStoryModalOpen, setAddStoryModalOpen] = useState(false);
  const [storyMediaInput, setStoryMediaInput] = useState("");
  const [storyCaptionInput, setStoryCaptionInput] = useState("");

  // 24-Hour Expiry Cleanup Interval Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStories(prevStories => prevStories.filter(s => s.expiresAt > now));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("tiktok_pro_24h_stories", JSON.stringify(stories));
  }, [stories]);

  // Profile Customization & Edit State
  const [bioInput, setBioInput] = useState("Full-Stack Software Architect & Cloud Engineer 💻⚡");
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  // Upload Modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newDesc, setNewDesc] = useState("");
  const [selectedAudioTrack, setSelectedAudioTrack] = useState("Original Sound - Tech Beats");

  // Profile & Sound View State
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedSound, setSelectedSound] = useState(null);
  const [duetModalData, setDuetModalData] = useState(null);

  const [drafts, setDrafts] = useState([
    { id: 1, title: "React 19 Server Actions Tutorial #coding", date: "2026-10-30" },
    { id: 2, title: "Docker & Kubernetes Cluster Setup 🚀", date: "2026-11-02" }
  ]);

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem("tiktok_ultimate_v19_videos");
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return [
      {
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
        channel: "tech_guru",
        avatar: "https://picsum.photos/seed/techguru/100/100",
        description: "Building a high performance micro-SaaS architecture! 💻🚀 #tech #reactjs #coding",
        song: "Original sound - Tech Beats",
        category: "Tech",
        likes: "126K",
        messages: "3260",
        shares: "7761",
        bookmarks: "15.3K"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        channel: "alex_dev",
        avatar: "https://picsum.photos/seed/alexdev/100/100",
        description: "Writing clean code and deploying to cloud infrastructure ✨ #developer #coding #webdev",
        song: "Coding Lofi Chill - Dev Beats",
        category: "Tech",
        likes: "450K",
        messages: "8.2K",
        shares: "19K",
        bookmarks: "42K"
      },
      {
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        channel: "code_master",
        avatar: "https://picsum.photos/seed/codemaster/100/100",
        description: "Debugging enterprise backend services at 3 AM ☕😂 #programmer #devlife #funny",
        song: "Coffee & Bugs - Dev Music",
        category: "Comedy",
        likes: "892K",
        messages: "12.4K",
        shares: "45.1K",
        bookmarks: "98K"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("tiktok_ultimate_v19_videos", JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("tiktok_active_user", currentUser);
    } else {
      localStorage.removeItem("tiktok_active_user");
    }
  }, [currentUser]);

  const handleAvatarClick = (channelName) => {
    const userStory = stories.find(s => s.channel.toLowerCase() === channelName.toLowerCase());
    if (userStory) {
      setActiveStoryModal(userStory);
    } else {
      setSelectedProfile(channelName);
      setActiveTab("forYou");
      setSelectedSound(null);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("❌ Please log in or sign up first to upload videos!");
      setAuthModalOpen(true);
      return;
    }
    if (selectedFile) {
      const videoBlobUrl = URL.createObjectURL(selectedFile);
      const newVid = {
        url: videoBlobUrl,
        channel: currentUser,
        avatar: `https://picsum.photos/seed/${currentUser}/100/100`,
        description: newDesc || "Masterpiece tech video 🚀 #coding",
        song: selectedAudioTrack,
        category: "Tech",
        likes: "1",
        messages: "0",
        shares: "0",
        bookmarks: "0"
      };
      setVideos([newVid, ...videos]);
      setSelectedFile(null);
      setNewDesc("");
      setUploadModalOpen(false);
      alert("✅ Tech video successfully published to feed!");
    } else {
      alert("Please select a video file.");
    }
  };

  const handleAddStorySubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("❌ Please log in first to post a story!");
      setAuthModalOpen(true);
      return;
    }
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const newStory = {
      id: Date.now(),
      channel: currentUser,
      avatar: `https://picsum.photos/seed/${currentUser}/100/100`,
      mediaUrl: storyMediaInput.trim() || `https://picsum.photos/seed/${Date.now()}/400/700`,
      createdAt: now,
      expiresAt: now + twentyFourHours,
      caption: storyCaptionInput.trim() || "✨ Story update!"
    };
    setStories([newStory, ...stories]);
    setStoryMediaInput("");
    setStoryCaptionInput("");
    setAddStoryModalOpen(false);
    alert("✨ 24-Hour Story published successfully!");
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      if (authEmail.trim() && authPassword.trim()) {
        const extractedUser = authEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '');
        setCurrentUser(extractedUser);
        setAuthModalOpen(false);
        setAuthEmail("");
        setAuthPassword("");
        alert(`✅ Welcome back, @${extractedUser}!`);
      }
    } else {
      if (authUsername.trim() && authEmail.trim() && authPassword.trim()) {
        const cleanUser = authUsername.trim().replace(/[^a-zA-Z0-9_]/g, '');
        setCurrentUser(cleanUser);
        setAuthModalOpen(false);
        setAuthUsername("");
        setAuthEmail("");
        setAuthPassword("");
        alert(`🎉 Account successfully created! Welcome, @${cleanUser}!`);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedProfile(null);
    alert("🔒 Successfully logged out.");
  };

  const handleSendGift = (giftName, cost, icon) => {
    if (coinBalance >= cost) {
      setCoinBalance(prev => prev - cost);
      const newGift = { id: Date.now(), name: `${icon} ${giftName}` };
      setFloatingGifts(prev => [...prev, newGift]);
      setGiftStoreModal(false);
      setTimeout(() => {
        setFloatingGifts(prev => prev.filter(g => g.id !== newGift.id));
      }, 3500);
    } else {
      alert("❌ Insufficient coins in wallet! Please get more coins.");
    }
  };

  const getRemainingTimeStr = (expiresAt) => {
    const diff = expiresAt - Date.now();
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m left`;
  };

  const filteredVideos = videos.filter(v => {
    if (activeTab === 'following') {
      if (currentUser && v.channel.toLowerCase() !== currentUser.toLowerCase()) {
        return false;
      }
    }
    const matchesSearch = v.channel.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const themeColors = {
    bg: darkMode ? '#0e0e10' : '#ffffff',
    text: darkMode ? '#ffffff' : '#161616',
    headerBg: darkMode ? 'rgba(18,18,22,0.95)' : '#f8f8f8',
    border: darkMode ? 'rgba(255,255,255,0.08)' : '#e0e0e0',
    sidebarBg: darkMode ? '#0e0e10' : '#ffffff',
    subText: darkMode ? '#888' : '#666'
  };

  return (
    <div style={{ backgroundColor: themeColors.bg, minHeight: '100vh', color: themeColors.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Floating Gift Animations Container */}
      {floatingGifts.map(g => (
        <div key={g.id} style={{ position: 'fixed', bottom: '120px', left: '50%', transform: 'translateX(-50%)', zIndex: '9999', backgroundColor: 'rgba(0,0,0,0.9)', color: '#ffd700', padding: '18px 36px', borderRadius: '40px', fontSize: '28px', fontWeight: 'bold', boxShadow: '0 0 30px #ffd700', animation: 'floatUp 3.5s ease-out forwards', border: '2px solid #ffd700', textAlign: 'center' }}>
          ✨ {g.name} Sent! ✨
        </div>
      ))}

      {/* Top Navbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 28px', borderBottom: `1px solid ${themeColors.border}`, backgroundColor: themeColors.headerBg, backdropFilter: 'blur(20px)', position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '1000', boxSizing: 'border-box' }}>
        <div onClick={() => { setActiveTab("forYou"); setSelectedProfile(null); setSelectedSound(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '22px', fontWeight: '900', cursor: 'pointer', letterSpacing: '-1px' }}>
          <span style={{ color: '#FE2C55', fontSize: '28px', filter: 'drop-shadow(0 0 8px #FE2C55)' }}>🎵</span> {t.title}
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : '#f1f1f2', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '92px', padding: '8px 18px', width: '340px' }}>
          <input 
            type="text" 
            placeholder={t.search} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: themeColors.text, outline: 'none', width: '100%', fontSize: '14px' }} 
          />
          <span role="img" aria-label="search" style={{ cursor: 'pointer' }}>🔍</span>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <button onClick={() => setNotificationsOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '8px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Notifications <span style={{ backgroundColor: '#FE2C55', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px' }}>3</span>
          </button>

          <button onClick={() => setGetCoinsModal(true)} style={{ backgroundColor: 'rgba(255,215,0,0.12)', border: '1px solid #ffd700', color: '#ffd700', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            🪙 Wallet ({coinBalance})
          </button>

          <button onClick={() => setDarkMode(!darkMode)} style={{ backgroundColor: 'transparent', border: `1px solid ${themeColors.border}`, color: themeColors.text, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button onClick={() => setUploadModalOpen(true)} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 15px rgba(254,44,85,0.4)' }}>{t.upload}</button>
          
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div onClick={() => handleAvatarClick(currentUser)} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }} title="Click for Story / Profile">
                <img src={`https://picsum.photos/seed/${currentUser}/40/40`} alt="avatar" style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                <span>@{currentUser}</span>
              </div>
              <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #FE2C55', color: '#FE2C55', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }} style={{ backgroundColor: '#FE2C55', color: 'white', border: 'none', padding: '9px 18px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Log in</button>
              <button onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }} style={{ backgroundColor: 'transparent', border: '1px solid #FE2C55', color: '#FE2C55', padding: '9px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Sign up</button>
            </div>
          )}
        </div>
      </header>

      {/* Main App Body */}
      <div style={{ display: 'flex', marginTop: '68px', height: 'calc(100vh - 68px)', width: '100%', overflow: 'hidden' }}>
        
        {/* Left Sidebar Navigation */}
        <aside style={{ width: '250px', borderRight: `1px solid ${themeColors.border}`, padding: '24px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: '0', backgroundColor: themeColors.sidebarBg }}>
          <div onClick={() => { setActiveTab("forYou"); setSelectedProfile(null); setSelectedSound(null); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'forYou' && !selectedProfile && !selectedSound ? 'rgba(254,44,85,0.15)' : 'transparent', color: activeTab === 'forYou' && !selectedProfile && !selectedSound ? '#FE2C55' : themeColors.text, fontWeight: '800', fontSize: '16px' }}>
            <span role="img" aria-label="home">🏠</span> {t.forYou}
          </div>
          <div onClick={() => { setActiveTab("following"); setSelectedProfile(null); setSelectedSound(null); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'following' && !selectedProfile && !selectedSound ? 'rgba(254,44,85,0.15)' : 'transparent', fontSize: '16px', color: activeTab === 'following' && !selectedProfile && !selectedSound ? '#FE2C55' : themeColors.subText, fontWeight: activeTab === 'following' ? '800' : 'normal' }}>
            <span role="img" aria-label="following">👥</span> {t.following}
          </div>
          <div onClick={() => { setNotificationsOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: 'transparent', fontSize: '16px', color: themeColors.subText }}>
            <span role="img" aria-label="inbox">📥</span> {t.inbox}
          </div>
          <div onClick={() => { setActiveTab("studio"); setSelectedProfile(null); setSelectedSound(null); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: activeTab === 'studio' && !selectedProfile && !selectedSound ? 'rgba(254,44,85,0.15)' : 'transparent', fontSize: '16px', color: activeTab === 'studio' && !selectedProfile && !selectedSound ? '#FE2C55' : themeColors.subText, fontWeight: activeTab === 'studio' ? '800' : 'normal' }}>
            <span role="img" aria-label="studio">📊</span> {t.studio}
          </div>
          {currentUser && (
            <div onClick={() => { setSelectedProfile(currentUser); setSelectedSound(null); }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', backgroundColor: selectedProfile === currentUser ? 'rgba(254,44,85,0.15)' : 'transparent', fontSize: '16px', color: selectedProfile === currentUser ? '#FE2C55' : themeColors.subText, fontWeight: '800' }}>
              <span role="img" aria-label="profile">👤</span> My Profile
            </div>
          )}
        </aside>

        {/* Central Content Container */}
        <main style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto', padding: '30px 20px', gap: '30px', boxSizing: 'border-box' }}>
          
          {selectedProfile ? (
            <div style={{ width: '100%', maxWidth: '750px', padding: '20px' }}>
              
              {/* Profile Header */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderBottom: `1px solid ${themeColors.border}`, paddingBottom: '30px', marginBottom: '25px' }}>
                <img onClick={() => handleAvatarClick(selectedProfile)} src={`https://picsum.photos/seed/${selectedProfile}/130/130`} alt="profile" style={{ width: '110px', height: '110px', borderRadius: '50%', border: '3px solid #FE2C55', objectFit: 'cover', marginBottom: '15px', boxShadow: '0 0 20px rgba(254,44,85,0.4)', cursor: 'pointer' }} title="Click to view story" />
                <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>@{selectedProfile}</h1>
                <p style={{ margin: '0 0 15px 0', color: themeColors.subText, fontSize: '14px', maxWidth: '400px' }}>{bioInput}</p>
                
                {/* Profile Stats */}
                <div style={{ display: 'flex', gap: '30px', fontSize: '15px', marginBottom: '20px' }}>
                  <div><b>240</b> <span style={{ color: themeColors.subText }}>Following</span></div>
                  <div><b>34.5K</b> <span style={{ color: themeColors.subText }}>Followers</span></div>
                  <div><b>289.1K</b> <span style={{ color: themeColors.subText }}>Likes</span></div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  {selectedProfile === currentUser ? (
                    <button onClick={() => setEditProfileOpen(true)} style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: themeColors.text, border: '1px solid rgba(255,255,255,0.12)', padding: '10px 24px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', zIndex: 10 }}>
                      ✏️ Edit profile
                    </button>
                  ) : (
                    <button onClick={() => alert(`✅ Now following @${selectedProfile}!`)} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '10px 28px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 15px rgba(254,44,85,0.4)' }}>
                      Follow
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Videos Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {videos.filter(v => v.channel.toLowerCase() === selectedProfile.toLowerCase()).map((vid, idx) => (
                  <div key={idx} style={{ backgroundColor: '#000', height: '260px', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <video src={vid.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                    <div style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '11px', fontWeight: 'bold', color: '#fff', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', padding: '3px 8px', borderRadius: '12px' }}>
                      ▶ 4.2K
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'studio' ? (
            <div style={{ width: '100%', maxWidth: '750px', padding: '20px' }}>
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '26px', margin: '0 0 8px 0' }}>📊 Creator Studio Analytics</h2>
                <p style={{ color: themeColors.subText, fontSize: '14px', margin: '0' }}>Monitor your channel performance, video engagement, and scheduled posts.</p>
              </div>

              {/* Stats Grid Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '13px', color: themeColors.subText, marginBottom: '8px' }}>Total Video Views</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#25f4ee' }}>148.2K</div>
                  <div style={{ fontSize: '11px', color: '#2ecc71', marginTop: '6px' }}>↑ 18.4% this week</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '13px', color: themeColors.subText, marginBottom: '8px' }}>Profile Followers</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#FE2C55' }}>34.5K</div>
                  <div style={{ fontSize: '11px', color: '#2ecc71', marginTop: '6px' }}>↑ 1,240 new followers</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px' }}>
                  <div style={{ fontSize: '13px', color: themeColors.subText, marginBottom: '8px' }}>Coin Revenue</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffd700' }}>🪙 {coinBalance}</div>
                  <div style={{ fontSize: '11px', color: '#ffd700', marginTop: '6px' }}>Active virtual balance</div>
                </div>
              </div>

              {/* Scheduled Posts Section */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>📅 Scheduled Post Calendar</h3>
                {drafts.map(d => (
                  <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: '14px 18px', borderRadius: '12px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{d.title}</div>
                      <div style={{ fontSize: '12px', color: themeColors.subText, marginTop: '2px' }}>Scheduled: {d.date}</div>
                    </div>
                    <button onClick={() => alert("🚀 Post published successfully to live feed!")} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Publish Now</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* --- STORIES TRAY --- */}
              <div style={{ display: 'flex', gap: '18px', marginBottom: '25px', width: '100%', maxWidth: '640px', overflowX: 'auto', paddingBottom: '12px', alignItems: 'center' }}>
                
                {/* Add Story Card */}
                <div onClick={() => setAddStoryModalOpen(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: '0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #FE2C55', fontSize: '26px', boxShadow: '0 0 15px rgba(254,44,85,0.2)' }}>
                    ➕
                  </div>
                  <span style={{ fontSize: '12px', marginTop: '8px', color: themeColors.text, fontWeight: '800' }}>Your Story</span>
                </div>

                {/* Live 24-Hour Active Stories */}
                {stories.map(story => (
                  <div key={story.id} onClick={() => setActiveStoryModal(story)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flexShrink: '0', position: 'relative' }}>
                    <div style={{ width: '76px', height: '76px', borderRadius: '50%', padding: '3px', background: 'linear-gradient(45deg, #FE2C55, #25f4ee, #ff0050)', boxShadow: '0 0 15px rgba(37,244,238,0.3)' }}>
                      <img src={story.avatar} alt={story.channel} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${darkMode ? '#0e0e10' : '#fff'}` }} />
                    </div>
                    
                    <div style={{ position: 'absolute', top: '-4px', right: '0', backgroundColor: '#FE2C55', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px' }}>
                      24h
                    </div>

                    <span style={{ fontSize: '12px', marginTop: '8px', color: themeColors.text, width: '76px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '600' }}>@{story.channel}</span>
                  </div>
                ))}
              </div>

              {/* Algorithmic Category Filter Pills */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '25px', width: '100%', maxWidth: '640px', overflowX: 'auto', paddingBottom: '5px' }}>
                {["All", "Tech", "Comedy"].map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ backgroundColor: selectedCategory === cat ? '#FE2C55' : 'rgba(255,255,255,0.06)', color: selectedCategory === cat ? '#fff' : themeColors.text, border: selectedCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.1)', padding: '8px 22px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', backdropFilter: 'blur(10px)' }}>
                    #{cat}
                  </button>
                ))}
              </div>

              {filteredVideos.length > 0 ? (
                filteredVideos.map((vid, index) => (
                  <Video 
                    key={index} 
                    {...vid} 
                    isActive={index === currentIndex}
                    autoScroll={false}
                    onOpenProfile={(ch) => setSelectedProfile(ch)}
                    onOpenSound={(s) => setSelectedSound(s)}
                    onOpenDuet={(url, ch) => {}}
                    onOpenGiftStore={() => setGiftStoreModal(true)}
                    onOpenAnalytics={(data) => setAnalyticsModalData(data)}
                    onAvatarClick={(ch) => handleAvatarClick(ch)}
                    onDownload={() => {
                      const a = document.createElement('a'); a.href = vid.url; a.download = `${vid.channel}_tiktok.mp4`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
                    }}
                    onShare={() => { navigator.clipboard.writeText(window.location.href); alert("🔗 Link copied!"); }}
                  />
                ))
              ) : (
                <div style={{ textAlign: 'center', marginTop: '100px', color: themeColors.subText }}>
                  <h3>No videos found in this feed.</h3>
                </div>
              )}
            </div>
          )}
        </main>

      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {editProfileOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: '8000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '30px', borderRadius: '20px', width: '420px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setEditProfileOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>✏️ Edit Profile Bio</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Bio / Description</label>
              <textarea value={bioInput} onChange={(e) => setBioInput(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', height: '90px', boxSizing: 'border-box', outline: 'none' }} />
            </div>

            <button onClick={() => { setEditProfileOpen(false); alert("✅ Profile bio updated successfully!"); }} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '14px', borderRadius: '25px', fontWeight: 'bold', width: '100%', cursor: 'pointer', boxShadow: '0 5px 20px rgba(254,44,85,0.4)' }}>Save Changes</button>
          </div>
        </div>
      )}

      {/* --- VIDEO ANALYTICS MODAL --- */}
      {analyticsModalData && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: '7000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '32px', borderRadius: '20px', width: '420px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setAnalyticsModalData(null)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 6px 0', fontSize: '22px' }}>📊 Video Performance Analytics</h2>
            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 20px 0' }}>Creator: @{analyticsModalData.channel}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px' }}>
                <span style={{ color: '#aaa' }}>Total Likes:</span>
                <span style={{ fontWeight: 'bold', color: '#FE2C55' }}>{analyticsModalData.likes}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px' }}>
                <span style={{ color: '#aaa' }}>Comments Count:</span>
                <span style={{ fontWeight: 'bold', color: '#25f4ee' }}>{analyticsModalData.messages}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px' }}>
                <span style={{ color: '#aaa' }}>Video Shares:</span>
                <span style={{ fontWeight: 'bold', color: '#ffd700' }}>{analyticsModalData.shares || '420'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '10px' }}>
                <span style={{ color: '#aaa' }}>Completion Rate:</span>
                <span style={{ fontWeight: 'bold', color: '#2ecc71' }}>89.4%</span>
              </div>
            </div>

            <button onClick={() => setAnalyticsModalData(null)} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>Close Analytics</button>
          </div>
        </div>
      )}

      {/* --- NOTIFICATIONS DRAWER --- */}
      {notificationsOpen && (
        <div style={{ position: 'fixed', right: '0', top: '68px', width: '380px', height: 'calc(100vh - 68px)', backgroundColor: 'rgba(18,18,22,0.98)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.1)', zIndex: '1200', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '-10px 0 30px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '800' }}>📥 Inbox Activity</h3>
            <button onClick={() => setNotificationsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
          </div>
          
          <div style={{ flex: '1', overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {notificationsList.map(n => (
              <div key={n.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '20px' }}>
                  {n.type === 'like' ? '❤️' : n.type === 'follow' ? '👤' : '💬'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', color: '#fff' }}><span style={{ fontWeight: 'bold' }}>@{n.user}</span> {n.text}</div>
                  <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PRO FULLSCREEN STORY VIEWER --- */}
      {activeStoryModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(25px)', zIndex: '6000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '380px', height: '680px', backgroundColor: '#000', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 60px rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Story Top Header Bar */}
            <div style={{ position: 'absolute', top: '22px', left: '16px', right: '16px', zIndex: '20', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '8px 12px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={activeStoryModal.avatar} alt="avatar" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #FE2C55' }} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>@{activeStoryModal.channel}</div>
                  <div style={{ fontSize: '11px', color: '#25f4ee', fontWeight: 'bold' }}>⏳ {getRemainingTimeStr(activeStoryModal.expiresAt)}</div>
                </div>
              </div>
              <button onClick={() => setActiveStoryModal(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Story Media */}
            <img src={activeStoryModal.mediaUrl} alt="Story content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            {/* Caption */}
            {activeStoryModal.caption && (
              <div style={{ position: 'absolute', bottom: '80px', left: '16px', right: '16px', backgroundColor: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(12px)', padding: '12px 16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '14px' }}>
                {activeStoryModal.caption}
              </div>
            )}

            {/* Footer */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="text" placeholder={`Reply to @${activeStoryModal.channel}...`} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '25px', padding: '12px 18px', color: '#fff', outline: 'none', fontSize: '13px' }} />
              <button onClick={() => { alert("❤️ Story Liked!"); }} style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '20px' }}>❤️</button>
              <button onClick={() => { alert("📤 Reply sent!"); setActiveStoryModal(null); }} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '0 18px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', height: '42px' }}>Send</button>
            </div>

          </div>
        </div>
      )}

      {/* --- ADD STORY MODAL --- */}
      {addStoryModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(15px)', zIndex: '5000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '32px', borderRadius: '20px', width: '420px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setAddStoryModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '22px' }}>✨ Post 24-Hour Story</h2>
            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 20px 0' }}>Disappears automatically after 24 hours.</p>
            
            <form onSubmit={handleAddStorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Image / Media URL</label>
                <input type="text" placeholder="https://picsum.photos/400/700" value={storyMediaInput} onChange={(e) => setStoryMediaInput(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#aaa', display: 'block', marginBottom: '6px' }}>Story Caption</label>
                <input type="text" placeholder="Add text overlay..." value={storyCaptionInput} onChange={(e) => setStoryCaptionInput(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '14px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', marginTop: '10px' }}>Publish 24h Story</button>
            </form>
          </div>
        </div>
      )}

      {/* --- VIRTUAL GIFT STORE MODAL --- */}
      {giftStoreModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: '3500', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '30px', borderRadius: '20px', width: '460px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setGiftStoreModal(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>🎁 Virtual Gift Store</h2>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>Your Coin Balance: 🪙 <b>{coinBalance} Coins</b></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div onClick={() => handleSendGift("Soap", 10, "🧼")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🧼</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Soap</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>10 Coins</div>
              </div>
              <div onClick={() => handleSendGift("Rose", 50, "🌹")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🌹</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Rose</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>50 Coins</div>
              </div>
              <div onClick={() => handleSendGift("TikTok Cap", 199, "🧢")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🧢</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Cap</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>199 Coins</div>
              </div>
              <div onClick={() => handleSendGift("Lion", 500, "🦁")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🦁</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Lion</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>500 Coins</div>
              </div>
              <div onClick={() => handleSendGift("Sports Car", 1000, "🏎️")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🏎️</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Car</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>1000 Coins</div>
              </div>
              <div onClick={() => handleSendGift("Universe", 3000, "🌌")} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '28px' }}>🌌</div>
                <div style={{ fontWeight: 'bold', fontSize: '13px', marginTop: '6px' }}>Universe</div>
                <div style={{ fontSize: '11px', color: '#ffd700' }}>3000 Coins</div>
              </div>
            </div>

            <button onClick={() => setGiftStoreModal(false)} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>Close Store</button>
          </div>
        </div>
      )}

      {/* --- GET COINS MODAL --- */}
      {getCoinsModal && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: '3000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '30px', borderRadius: '20px', width: '420px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative', textAlign: 'center' }}>
            <button onClick={() => setGetCoinsModal(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '22px' }}>🪙 Get Coins Wallet</h2>
            <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '20px' }}>Current Balance: <b>{coinBalance} Coins</b></p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div onClick={() => { setCoinBalance(coinBalance + 100); alert("✅ Added 100 Coins!"); }} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>100 Coins</div>
                <div style={{ fontSize: '12px', color: '#FE2C55', marginTop: '4px' }}>$0.99</div>
              </div>
              <div onClick={() => { setCoinBalance(coinBalance + 500); alert("✅ Added 500 Coins!"); }} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>500 Coins</div>
                <div style={{ fontSize: '12px', color: '#FE2C55', marginTop: '4px' }}>$4.99</div>
              </div>
            </div>
            <button onClick={() => setGetCoinsModal(false)} style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>Close Wallet</button>
          </div>
        </div>
      )}

      {/* --- AUTHENTICATION MODAL --- */}
      {authModalOpen && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(15px)', zIndex: '5000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(22,22,26,0.95)', color: '#fff', padding: '35px', borderRadius: '20px', width: '420px', border: '1px solid rgba(255,255,255,0.12)', boxSizing: 'border-box', position: 'relative' }}>
            <button onClick={() => setAuthModalOpen(false)} style={{ position: 'absolute', top: '18px', right: '18px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{authMode === 'login' ? 'Log in to TikTok' : 'Sign up for TikTok'}</h2>
            </div>

            <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
              <div onClick={() => setAuthMode('login')} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', backgroundColor: authMode === 'login' ? '#FE2C55' : 'transparent' }}>Log in</div>
              <div onClick={() => setAuthMode('signup')} style={{ flex: 1, textAlign: 'center', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', backgroundColor: authMode === 'signup' ? '#FE2C55' : 'transparent' }}>Sign up</div>
            </div>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {authMode === 'signup' && (
                <input type="text" placeholder="Username" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} required />
              )}
              <input type="email" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} required />
              <input type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#fff', boxSizing: 'border-box' }} required />
              <button type="submit" style={{ backgroundColor: '#FE2C55', color: '#fff', border: 'none', padding: '14px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>{authMode === 'login' ? 'Log in' : 'Sign up'}</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
export default App;
