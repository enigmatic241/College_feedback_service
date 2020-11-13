SELECT feedbacks.*, category.*, 
(SELECT COUNT(*) FROM fbupvote WHERE fbupvote.fbId = feedbacks.fbId) as upvoteCount, 
(SELECT COUNT(*) FROM fbdownvote WHERE fbdownvote.fbId = feedbacks.fbId) as downvoteCount
FROM feedbacks, category 
WHERE category.catId = feedbacks.catId;

 AND 
fbupvote.fbId = feedbacks.fbId AND fbdownvote.fbId = feedbacks.fbId;