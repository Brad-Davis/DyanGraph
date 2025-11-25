class Node {
    constructor(name, x, y, height, width, imgUrl, linkUrl) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.imgUrl = imgUrl;
        this.linkUrl = linkUrl;
        this.isActive = false;
    }

    onHover () {
        this.isActive = true;
    }

    onLeave () {
        this.isActive = false;
    }

    onClick () {
        window.open(this.linkUrl);
    }
}

export default Node;