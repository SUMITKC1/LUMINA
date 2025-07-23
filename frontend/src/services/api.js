// Basic API utility for frontend

const API_BASE_URL = 'http://localhost:5000/api/auth'; // Updated to match backend

export async function signup(userData) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return response.json();
}

export async function login(credentials) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function getData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
}

export async function createPost(postData) {
    // postData should have slides instead of content
    const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    return response.json();
}

export async function getPosts() {
    const response = await fetch('http://localhost:5000/api/posts');
    return response.json();
}

export async function getPostsByAuthor(author) {
    const response = await fetch(`http://localhost:5000/api/posts?author=${encodeURIComponent(author)}`);
    return response.json();
}

export async function savePost(username, postId) {
    const response = await fetch('http://localhost:5000/api/auth/savePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, postId })
    });
    return response.json();
}

export async function unsavePost(username, postId) {
    const response = await fetch('http://localhost:5000/api/auth/unsavePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, postId })
    });
    return response.json();
}

export async function getSavedPosts(username) {
    const response = await fetch(`http://localhost:5000/api/auth/savedPosts/${username}`);
    return response.json();
}

export async function getTimelineTasks(username) {
    const response = await fetch(`http://localhost:5000/api/auth/timelineTasks/${username}`);
    return response.json();
}

export async function saveTimelineTasks(username, tasks) {
    const response = await fetch('http://localhost:5000/api/auth/timelineTasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, tasks })
    });
    return response.json();
}

export async function getSchedule(username) {
    const response = await fetch(`http://localhost:5000/api/auth/schedule/${username}`);
    return response.json();
}

export async function saveSchedule(username, schedule) {
    const response = await fetch('http://localhost:5000/api/auth/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, schedule })
    });
    return response.json();
}

export async function updateProfile(profileData) {
    const response = await fetch('http://localhost:5000/api/auth/updateProfile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
    });
    return response.json();
}

export async function deletePost(postId) {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
    });
    return response.json();
}

export async function getProfile(username) {
    const response = await fetch(`http://localhost:5000/api/auth/profile/${username}`);
    return response.json();
}

export async function getNotifications(username) {
    const response = await fetch(`http://localhost:5000/api/auth/notifications/${username}`);
    return response.json();
} 