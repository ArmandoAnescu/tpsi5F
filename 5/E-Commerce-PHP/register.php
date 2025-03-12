<?php
include 'header.php';
?>
<div class="container mt-5 pt-5">
    <form action="action_page.php?action=register" method="post">
        <label for="username">Username:</label>
        <br>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="email" id="emailLabel">Email</label>
        <br>
        <input type="email" id="email" name="email" placeholder="ex@example.com" required>
        <br>
        <label for="password" id="passwordLabel">Password</label>
        <br>
        <input type="password" id="password" name="password" placeholder="password" required>
        <br><br>
        <input type="submit" value="Registrati" class="btn register">

    </form>
</div>
<?php
include 'footer.php';
