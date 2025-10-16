class Node {
    constructor(name, x, y, imgUrl, linkUrl) {
        this.name = name;
        this.x = x;
        this.y = y;
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