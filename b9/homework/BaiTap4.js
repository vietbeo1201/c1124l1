// JavaScript: script.js

// Mảng lưu trữ các hình ảnh ban đầu
const images = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg'
];

// Mảng lưu trữ trạng thái của các ô ảnh
let cellImages = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg'
];

// Lấy tất cả các ô ảnh
const cells = document.querySelectorAll('.cell');


// Hàm để kiểm tra xem các ô ảnh đã được ghép thành bức tranh hoàn thiện chưa
function checkCompletion() {
    for (let i = 0; i < cells.length; i++) {
        const img = cells[i].querySelector('img');
        if (img.src.split('/').pop() !== images[i]) {
            return false; // Nếu có ô ảnh chưa đúng, trả về false
        }
    }
    return true; // Nếu tất cả đều đúng, trả về true
}

// Xử lý sự kiện khi click vào ảnh
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const currentImage = cell.querySelector('img').src.split('/').pop();  // Lấy tên ảnh hiện tại
        const currentIndex = images.indexOf(currentImage);  // Tìm chỉ số của ảnh hiện tại trong mảng

        // Xác định ảnh kế tiếp
        const nextIndex = (currentIndex + 1) % images.length;
        const nextImage = images[nextIndex];

        // Thay đổi ảnh trong ô
        cell.querySelector('img').src = nextImage;

        // Kiểm tra xem bức tranh đã hoàn thành chưa
        if (checkCompletion()) {
            message.style.display = 'block'; // Hiển thị thông báo khi hoàn thành
        }
    });
});
