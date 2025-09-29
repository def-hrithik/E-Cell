// Reading Progress Bar
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const scrolled = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Smooth scrolling for table of contents
document.querySelectorAll('.toc a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =======================================================
// == Share and Copy Link Functionality
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const mainShareBtn = document.getElementById('mainShareBtn');
    const socialOptions = document.getElementById('socialOptions');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const copyLinkText = document.getElementById('copyLinkText');

    // --- Share button logic ---
    if (mainShareBtn && socialOptions) {
        mainShareBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the click from closing the menu immediately
            socialOptions.classList.toggle('active');
        });

        // Close menu if clicking outside
        document.addEventListener('click', (event) => {
            if (!mainShareBtn.contains(event.target) && !socialOptions.contains(event.target)) {
                socialOptions.classList.remove('active');
            }
        });

        // --- Populate social media links ---
        const postUrl = encodeURIComponent(window.location.href);
        const postTitle = encodeURIComponent(document.title);
        const whatsAppText = encodeURIComponent(document.title + " " + window.location.href);

        const shareTwitter = document.getElementById('shareTwitter');
        const shareLinkedIn = document.getElementById('shareLinkedIn');
        const shareFacebook = document.getElementById('shareFacebook');
        const shareWhatsApp = document.getElementById('shareWhatsApp');

        if(shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        if(shareLinkedIn) shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        if(shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        if(shareWhatsApp) shareWhatsApp.href = `https://api.whatsapp.com/send?text=${whatsAppText}`;
    }

    // --- Copy link button logic ---
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                // Success feedback
                const originalText = copyLinkText.textContent;
                copyLinkText.textContent = 'Copied!';
                copyLinkBtn.style.color = '#39FF14'; // Neon green for success
                copyLinkBtn.style.borderColor = '#39FF14';

                // Revert back after 2 seconds
                setTimeout(() => {
                    copyLinkText.textContent = originalText;
                    copyLinkBtn.style.color = ''; // Reverts to CSS color
                    copyLinkBtn.style.borderColor = ''; // Reverts to CSS border color
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                try {
                    const textArea = document.createElement("textarea");
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    // Success feedback
                    const originalText = copyLinkText.textContent;
                    copyLinkText.textContent = 'Copied!';
                    copyLinkBtn.style.color = '#39FF14';
                    copyLinkBtn.style.borderColor = '#39FF14';

                    setTimeout(() => {
                        copyLinkText.textContent = originalText;
                        copyLinkBtn.style.color = '';
                        copyLinkBtn.style.borderColor = '';
                    }, 2000);

                } catch (err) {
                     alert('Failed to copy link.');
                }
            });
        });
    }
});


// Hide/show table of contents on mobile
if (window.innerWidth <= 1200) {
    const toc = document.getElementById('tableOfContents');
    if (toc) toc.style.display = 'none';
}
