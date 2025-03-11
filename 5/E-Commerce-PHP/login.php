<?php
include 'header.php';
?>
<div class="container mt-5 pt-5">
    <form action="action_page.php" method="post">
        <label for="email" id="emailLabel">Email</label>
        <br>
        <input type="email" id="email" name="email" placeholder="ex@example.com" required>
        <br>
        <label for="password" id="passwordLabel">Password</label>
        <br>
        <input type="password" id="password" name="password" placeholder="password" required>
        <br><br>
        <input type="submit" value="Login" class="btn ">

    </form>
</div>
<?php
include 'footer.php';
